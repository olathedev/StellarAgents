import { Router } from "express";
import { walletController } from "../controllers/walletController";

const router = Router();

router.get("/generate", walletController.generateWallet);
router.get("/:publicKey/balance", walletController.getBalance);
router.get("/:publicKey/transactions", walletController.getTransactions);

export default router;
