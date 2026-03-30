import { findUserById, saveUser, Transaction } from "../../core/db";

export const getWalletBalance = (userId: string): number | null => {
  const user = findUserById(userId);
  return user ? user.wallet_balance : null;
};

export const getTransactions = (userId: string): Transaction[] | null => {
  const user = findUserById(userId);
  return user ? user.transactions : null;
};

export const processTransaction = (
  userId: string,
  type: "credit" | "debit",
  amount: number,
  description: string
): boolean => {
  const user = findUserById(userId);
  if (!user) return false;

  if (type === "debit" && user.wallet_balance < amount) {
    return false; // Insufficient funds
  }

  const transaction: Transaction = {
    id: Math.random().toString(36).substr(2, 9),
    type,
    amount,
    description,
    timestamp: new Date().toISOString(),
  };

  user.wallet_balance += type === "credit" ? amount : -amount;
  user.transactions.push(transaction);
  saveUser(user);

  return true;
};
