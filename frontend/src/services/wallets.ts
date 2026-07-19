
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit/sdk";
import { defaultModules } from "@creit.tech/stellar-wallets-kit/modules/utils";
import { KitEventType, Networks } from "@creit.tech/stellar-wallets-kit/types";

let initialized = false;

export function initKit(network: Networks = Networks.TESTNET) {
  if (initialized) return;
  StellarWalletsKit.init({
    modules: defaultModules(),
    network,
  });
  initialized = true;
}

export async function getSupportedWallets() {
  return StellarWalletsKit.refreshSupportedWallets();
}

export async function openAuthModal() {
  return StellarWalletsKit.authModal();
}

export async function getAddress(): Promise<string> {
  try {
    const result = await StellarWalletsKit.getAddress();
    if (!result || !result.address) {
      throw { code: -1, message: "No wallet connected" };
    }
    return result.address;
  } catch (e) {
    const err = e as { code?: number; message?: string };
    if (err.code === -1) {
      throw new WalletError("WALLET_NOT_FOUND", "No wallet connected. Please connect a wallet first.");
    }
    if (err.code === -3) {
      throw new WalletError("WALLET_NOT_FOUND", "No wallet selected. Please select a wallet first.");
    }
    throw new WalletError("WALLET_REJECTED", err.message || "Failed to get address");
  }
}

export async function signTransaction(xdr: string, opts?: { networkPassphrase?: string; address?: string }) {
  try {
    const result = await StellarWalletsKit.signTransaction(xdr, {
      networkPassphrase: opts?.networkPassphrase,
      address: opts?.address,
    });
    return result.signedTxXdr;
  } catch (e) {
    const err = e as { message?: string };
    throw new WalletError("WALLET_REJECTED", err.message || "Transaction signing was rejected");
  }
}

export async function disconnectWallet() {
  await StellarWalletsKit.disconnect();
}

export function onWalletChange(callback: (address: string | null) => void) {
  return StellarWalletsKit.on(KitEventType.STATE_UPDATED, (event) => {
    callback(event.payload?.address || null);
  });
}

export class WalletError extends Error {
  code: "WALLET_NOT_FOUND" | "WALLET_REJECTED" | "INSUFFICIENT_BALANCE";
  constructor(
    code: "WALLET_NOT_FOUND" | "WALLET_REJECTED" | "INSUFFICIENT_BALANCE",
    message: string
  ) {
    super(message);
    this.name = "WalletError";
    this.code = code;
  }
}

export function getWalletErrorLabel(code: string): string {
  switch (code) {
    case "WALLET_NOT_FOUND":
      return "Wallet not detected. Please install Freighter, Albedo, or Lobstr.";
    case "WALLET_REJECTED":
      return "Connection rejected. You declined the wallet request.";
    case "INSUFFICIENT_BALANCE":
      return "Insufficient XLM balance for this transaction.";
    default:
      return "An unexpected wallet error occurred.";
  }
}
