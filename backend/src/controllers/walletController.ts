import { Request, Response, NextFunction } from "express";
import { walletService } from "../services/walletService";
import { stellarService } from "../services/stellarService";
import { ok, serverError } from "../utils/response";

export const walletController = {
  async getBalance(req: Request, res: Response, next: NextFunction) {
    try {
      const { publicKey } = req.params;
      const balance = await walletService.getBalance(publicKey);
      ok(res, balance);
    } catch (err) {
      next(err);
    }
  },

  async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const { publicKey } = req.params;
      const limit = parseInt((req.query.limit as string) ?? "20", 10);
      const txs = await walletService.getTransactions(publicKey, limit);
      ok(res, txs);
    } catch (err) {
      next(err);
    }
  },

  async generateWallet(_req: Request, res: Response, next: NextFunction) {
    try {
      const keypair = stellarService.generateKeypair();
      ok(res, { publicKey: keypair.publicKey });
    } catch (err) {
      next(err);
    }
  },
};
