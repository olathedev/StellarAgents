import {
  Keypair,
  Horizon,
  Networks,
  TransactionBuilder,
  BASE_FEE,
  Asset,
  Operation,
  Memo,
} from "@stellar/stellar-sdk";
import { config } from "../config";

const server = new Horizon.Server(config.stellar.horizonUrl);
const networkPassphrase =
  config.stellar.network === "mainnet" ? Networks.PUBLIC : Networks.TESTNET;

const USDC_ASSET = new Asset(
  "USDC",
  config.stellar.network === "testnet"
    ? "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5" // testnet USDC issuer
    : "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN"  // mainnet USDC issuer
);

export const stellarService = {
  /** Generate a new keypair for an agent wallet */
  generateKeypair() {
    const kp = Keypair.random();
    return { publicKey: kp.publicKey(), secretKey: kp.secret() };
  },

  /** Fund an account on testnet via Friendbot */
  async fundTestnetAccount(publicKey: string): Promise<void> {
    const res = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
    );
    if (!res.ok) throw new Error(`Friendbot failed: ${res.statusText}`);
  },

  /** Get USDC balance for an account */
  async getUsdcBalance(publicKey: string): Promise<string> {
    const account = await server.loadAccount(publicKey);
    const usdc = account.balances.find(
      (b) =>
        b.asset_type !== "native" &&
        "asset_code" in b &&
        b.asset_code === "USDC"
    );
    return usdc ? usdc.balance : "0";
  },

  /** Send USDC from one account to another */
  async sendUsdc(params: {
    fromSecret: string;
    toPublicKey: string;
    amount: string;
    memo?: string;
  }): Promise<string> {
    const { fromSecret, toPublicKey, amount, memo } = params;
    const sourceKeypair = Keypair.fromSecret(fromSecret);
    const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

    const txBuilder = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase,
    })
      .addOperation(
        Operation.payment({
          destination: toPublicKey,
          asset: USDC_ASSET,
          amount,
        })
      )
      .setTimeout(30);

    if (memo) txBuilder.addMemo(Memo.text(memo));

    const tx = txBuilder.build();
    tx.sign(sourceKeypair);

    const result = await server.submitTransaction(tx);
    return result.hash;
  },

  /** Get recent transactions for an account */
  async getTransactions(publicKey: string, limit = 20) {
    const txs = await server
      .transactions()
      .forAccount(publicKey)
      .limit(limit)
      .order("desc")
      .call();
    return txs.records;
  },
};
