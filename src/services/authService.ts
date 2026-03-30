export const authService = {
  register: async (phone: string) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    return await response.json();
  },
  getProfile: async (userId: string) => {
    const response = await fetch(`/api/auth/profile/${userId}`);
    return await response.json();
  },
};
