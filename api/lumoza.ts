import { Router } from "express";
import { lumozaAI } from "../modules/lumoza/index";

const router = Router();

router.post("/chat", async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: "Missing required fields: userId and message" });
  }

  try {
    const response = await lumozaAI.processChat(userId, message);
    res.json(response);
  } catch (error) {
    console.error("[LUMOZA API Error]:", error);
    res.status(500).json({ error: "Internal server error processing chat." });
  }
});

export default router;
