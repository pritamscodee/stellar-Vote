import {
  Keypair,
  TransactionBuilder,
  Networks,
  Operation,
  BASE_FEE,
  rpc,
  Horizon,
  xdr,
  Address,
  scValToNative,
} from "@stellar/stellar-sdk";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const NETWORK = process.env.STELLAR_NETWORK || "testnet";
const RPC_URL = `https://soroban-${NETWORK === "mainnet" ? "mainnet" : "testnet"}.stellar.org`;
const HORIZON_URL = `https://horizon-${NETWORK === "mainnet" ? "mainnet" : "testnet"}.stellar.org`;
const networkPassphrase = NETWORK === "mainnet" ? Networks.PUBLIC : Networks.TESTNET;

const server = new Horizon.Server(HORIZON_URL);
const sorobanServer = new rpc.Server(RPC_URL);

async function waitForTx(hash) {
  while (true) {
    const tx = await sorobanServer.getTransaction(hash);
    if (tx.status === "SUCCESS") return tx;
    if (tx.status === "FAILED") throw new Error(`TX failed: ${JSON.stringify(tx)}`);
    await new Promise((r) => setTimeout(r, 2000));
  }
}

async function main() {
  const secretKey = process.env.STELLAR_SECRET_KEY;
  const kp = secretKey ? Keypair.fromSecret(secretKey) : Keypair.random();
  const publicKey = kp.publicKey();

  console.log("Deployer:", publicKey);
  if (!secretKey) console.log("Secret:", kp.secret());

  // Fund account if needed
  try {
    await server.loadAccount(publicKey);
    console.log("Account exists");
  } catch {
    console.log("Funding via Friendbot...");
    const res = await fetch(`https://friendbot.stellar.org?addr=${publicKey}`);
    const data = await res.json();
    if (!data.hash) {
      console.error("Friendbot error:", data);
      process.exit(1);
    }
    console.log("Funded:", data.hash);
  }

  // Load WASM
  const wasmPath = join(__dirname, "..", "..", "contracts", "poll", "stellar_poll.wasm");
  const wasmBytes = readFileSync(wasmPath);
  console.log("WASM:", wasmBytes.length, "bytes");

  // Step 1: Install WASM code
  console.log("\n--- Step 1: Install WASM ---");
  const account = await server.loadAccount(publicKey);
  const installTx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: networkPassphrase,
  })
    .addOperation(Operation.uploadContractWasm({ wasm: Buffer.from(wasmBytes) }))
    .setTimeout(30)
    .build();

  const installSim = await sorobanServer.simulateTransaction(installTx);
  if ("error" in installSim) {
    console.error("Sim error:", installSim.error);
    process.exit(1);
  }

  const installPrepped = rpc.assembleTransaction(installTx, installSim).build();
  installPrepped.sign(kp);
  const installResult = await sorobanServer.sendTransaction(installPrepped);
  if (installResult.status !== "PENDING") {
    console.error("Install failed:", installResult);
    process.exit(1);
  }
  console.log("Submitted:", installResult.hash);
  const installTxResult = await waitForTx(installResult.hash);

  // Get WASM hash from result
  const wasmHashBytes = installTxResult.returnValue?.value();
  if (!wasmHashBytes) {
    console.error("No WASM hash returned");
    console.log("Result:", JSON.stringify(installTxResult, null, 2));
    process.exit(1);
  }
  const wasmHashHex = Buffer.from(wasmHashBytes).toString("hex");
  console.log("WASM hash:", wasmHashHex);

  // Step 2: Create contract
  console.log("\n--- Step 2: Create Contract ---");
  const account2 = await server.loadAccount(publicKey);
  const createTx = new TransactionBuilder(account2, {
    fee: BASE_FEE,
    networkPassphrase: networkPassphrase,
  })
    .addOperation(
      Operation.createCustomContract({
        wasmHash: Buffer.from(wasmHashBytes),
        address: new Address(publicKey),
        source: publicKey,
      })
    )
    .setTimeout(30)
    .build();

  const createSim = await sorobanServer.simulateTransaction(createTx);
  if ("error" in createSim) {
    console.error("Sim error:", createSim.error);
    process.exit(1);
  }

  const createPrepped = rpc.assembleTransaction(createTx, createSim).build();
  createPrepped.sign(kp);
  const createResult = await sorobanServer.sendTransaction(createPrepped);
  if (createResult.status !== "PENDING") {
    console.error("Create failed:", createResult);
    process.exit(1);
  }
  console.log("Submitted:", createResult.hash);
  const createTxResult = await waitForTx(createResult.hash);
  console.log("Create TX result:", JSON.stringify(createTxResult, null, 2).slice(0, 500));

  // Get contract ID
  try {
    const contractAddr = scValToNative(createTxResult.returnValue);
    console.log("\n=== DEPLOYMENT COMPLETE ===");
    console.log("Contract ID:", contractAddr.toString());
    console.log("Install TX:", installResult.hash);
    console.log("Create TX:", createResult.hash);
  } catch (e) {
    console.error("Failed to parse contract ID:", e.message);
    console.log("Raw returnValue:", JSON.stringify(createTxResult.returnValue).slice(0, 500));
  }
}

main().catch(console.error);
