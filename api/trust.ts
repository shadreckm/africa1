import { Router } from "express";
import { getTrustScore, updateTrustScore, logActivity } from "../modules/zentari/trust";

const router = Router();

/**
 * GET /api/trust/:userId
 * Returns the user's trust score.
 */
router.get("/:userId", (req, res) => {
  const score = getTrustScore(req.params.userId);
  if (score === null) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({ trust_score: score });
});

/**
 * POST /api/trust/update
 * Manually updates the trust score.
 */
router.post("/update", (req, res) => {
  const { userId, scoreChange } = req.body;

  if (!userId || typeof scoreChange !== "number") {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const success = updateTrustScore(userId, scoreChange);
  if (!success) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ message: "Trust score updated successfully", trust_score: getTrustScore(userId) });
});

/**
 * POST /api/trust/log-activity
 * Logs user activity and increases trust score.
 */
router.post("/log-activity", (req, res) => {
  const { userId, activityType } = req.body;

  if (!userId || !activityType) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const success = logActivity(userId, activityType);
  if (!success) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ message: "Activity logged and trust score updated", trust_score: getTrustScore(userId) });
});

export default router;
