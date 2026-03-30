export interface User {
  id: string;
  phone: string;
  created_at: string;
  wallet_balance: number;
  trust_score: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  timestamp: string;
}

// In-memory storage
export const users: Map<string, User> = new Map();

export const findUserByPhone = (phone: string) => {
  return Array.from(users.values()).find((u) => u.phone === phone);
};

export const findUserById = (id: string) => {
  return users.get(id);
};

export const saveUser = (user: User) => {
  users.set(user.id, user);
};
