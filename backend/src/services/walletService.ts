import { stellarService } from "./stellarService";

export const walletService = {
  async getBalance(publicKey: string) {
    const usdc = await stellarService.getUsdcBalance(publicKey);
    return { publicKey, usdc };
  },

  async getTransactions(publicKey: string, limit = 20) {
    const txs = await stellarService.getTransactions(publicKey, limit);
    return txs.map((tx) => ({
      hash: tx.hash,
      createdAt: tx.created_at,
      successful: tx.successful,
      feeCharged: tx.fee_charged,
    }));
  },
};
