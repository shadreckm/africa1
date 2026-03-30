import { findUserById, saveUser } from "../../core/db";

export const getTrustScore = (userId: string): number | null => {
  const user = findUserById(userId);
  return user ? user.trust_score : null;
};

export const updateTrustScore = (userId: string, scoreChange: number): boolean => {
  const user = findUserById(userId);
  if (!user) return false;

  user.trust_score += scoreChange;
  // Clamp score between 0 and 1000
  user.trust_score = Math.max(0, Math.min(1000, user.trust_score));
  saveUser(user);

  return true;
};

/**
 * Increases trust score when a user logs activity.
 */
export const logActivity = (userId: string, activityType: string): boolean => {
  console.log(`[ZENTARI] Logging activity for user ${userId}: ${activityType}`);
  // Activity logging increases trust score by 2
  return updateTrustScore(userId, 2);
};
