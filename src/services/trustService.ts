export const trustService = {
  getScore: async (userId: string) => {
    const response = await fetch(`/api/trust/${userId}`);
    return await response.json();
  },
  logActivity: async (userId: string, activityType: string) => {
    const response = await fetch("/api/trust/log-activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, activityType }),
    });
    return await response.json();
  },
};
