import {
  Keypair,
  TransactionBuilder,
  Networks,
  Operation,
  BASE_FEE,
  rpc,
  Horizon,
  nativeToScVal,
  xdr,
  Address,
} from "@stellar/stellar-sdk";

const NETWORK = process.env.STELLAR_NETWORK || "testnet";
const RPC_URL = `https://soroban-${NETWORK === "mainnet" ? "mainnet" : "testnet"}.stellar.org`;
const HORIZON_URL = `https://horizon-${NETWORK === "mainnet" ? "mainnet" : "testnet"}.stellar.org`;
const networkPassphrase = NETWORK === "mainnet" ? Networks.PUBLIC : Networks.TESTNET;

const server = new Horizon.Server(HORIZON_URL);
const sorobanServer = new rpc.Server(RPC_URL);

const CONTRACT_ID = process.env.CONTRACT_ID || "CDROSAGWRIQG5TSRF2FFFFXZD3RGPWDS6I3IWUTC67MELRRLZHNOE6ID";
const SECRET = process.env.STELLAR_SECRET_KEY || "SCRGIVMDR23LTZ7F7JQCD3EFO5NQJHPRDOOHNU7RFKXDJAXZ2S6W2UBG";

async function waitForTx(hash) {
  while (true) {
    const tx = await sorobanServer.getTransaction(hash);
    if (tx.status === "SUCCESS") return tx;
    if (tx.status === "FAILED") throw new Error(`TX failed`);
    await new Promise((r) => setTimeout(r, 2000));
  }
}

async function main() {
  const kp = Keypair.fromSecret(SECRET);
  const publicKey = kp.publicKey();
  console.log("Initializing contract from:", publicKey);

  const question = nativeToScVal("What is the best blockchain?", { type: "string" });
  const optionStrs = ["Stellar", "Ethereum", "Solana", "Bitcoin"];
  const optionVals = optionStrs.map((o) => nativeToScVal(o, { type: "string" }));
  const optionsVec = xdr.ScVal.scvVec(optionVals);
  const deadline = nativeToScVal(Math.floor(Date.now() / 1000) + 86400 * 7, { type: "u64" });
  const ownerAddr = new Address(publicKey).toScVal();

  const account = await server.loadAccount(publicKey);
  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: networkPassphrase,
  })
    .addOperation(
      Operation.invokeContractFunction({
        contract: CONTRACT_ID,
        function: "initialize",
        args: [ownerAddr, question, optionsVec, deadline],
      })
    )
    .setTimeout(30)
    .build();

  const sim = await sorobanServer.simulateTransaction(tx);
  if ("error" in sim) {
    console.error("Sim error:", sim.error);
    process.exit(1);
  }

  const prepped = rpc.assembleTransaction(tx, sim).build();
  prepped.sign(kp);
  const result = await sorobanServer.sendTransaction(prepped);
  console.log("Submitted:", result.hash, "status:", result.status);

  const final = await waitForTx(result.hash);
  console.log("Initialized! Status:", final.status);
}

main().catch(console.error);
