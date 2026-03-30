import { Router } from "express";
import { getWalletBalance, getTransactions, processTransaction } from "../modules/zentari/wallet";

const router = Router();

/**
 * GET /api/wallet/:userId
 * Returns balance and transaction history.
 */
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  const balance = getWalletBalance(userId);
  const transactions = getTransactions(userId);

  if (balance === null) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ balance, transactions });
});

/**
 * POST /api/wallet/credit
 * Credits the user's wallet.
 */
router.post("/credit", (req, res) => {
  const { userId, amount, description } = req.body;

  if (!userId || !amount || !description) {
    return res.status(400).json({ error: "Missing required fields: userId, amount, description" });
  }

  const success = processTransaction(userId, "credit", amount, description);
  if (!success) {
    return res.status(400).json({ error: "Credit failed." });
  }

  res.json({ message: "Wallet credited successfully", balance: getWalletBalance(userId) });
});

/**
 * POST /api/wallet/debit
 * Debits the user's wallet.
 */
router.post("/debit", (req, res) => {
  const { userId, amount, description } = req.body;

  if (!userId || !amount || !description) {
    return res.status(400).json({ error: "Missing required fields: userId, amount, description" });
  }

  const success = processTransaction(userId, "debit", amount, description);
  if (!success) {
    return res.status(400).json({ error: "Debit failed. Insufficient funds or invalid user." });
  }

  res.json({ message: "Wallet debited successfully", balance: getWalletBalance(userId) });
});

export default router;
