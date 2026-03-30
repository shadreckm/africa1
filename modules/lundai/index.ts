export const lundaiHousing = {
  getAvailableUnits: () => {
    return [
      { id: "unit-1", type: "Studio", location: "Lilongwe", price: 150000 },
      { id: "unit-2", type: "2 Bedroom", location: "Blantyre", price: 350000 },
    ];
  },
  applyForHousing: (userId: string, unitId: string) => {
    return {
      status: "pending",
      message: "Application received. Trust score verification in progress.",
      applicationId: Math.random().toString(36).substr(2, 9),
    };
  },
};
