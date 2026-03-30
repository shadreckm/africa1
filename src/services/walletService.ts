export const walletService = {
  getWallet: async (userId: string) => {
    const response = await fetch(`/api/wallet/${userId}`);
    return await response.json();
  },
  credit: async (userId: string, amount: number, description: string) => {
    const response = await fetch("/api/wallet/credit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount, description }),
    });
    return await response.json();
  },
  debit: async (userId: string, amount: number, description: string) => {
    const response = await fetch("/api/wallet/debit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount, description }),
    });
    return await response.json();
  },
};
