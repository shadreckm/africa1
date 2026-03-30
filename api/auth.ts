import { Router } from "express";
import { users, findUserByPhone, saveUser, User } from "../core/db";
import { config } from "../config/env";

const router = Router();

router.post("/register", (req, res) => {
  const { phone, firebaseUid } = req.body;

  console.log("Registering user:", { phone, firebaseUid });

  if (!phone) {
    console.error("Registration failed: Phone number is missing");
    return res.status(400).json({ error: "Phone number is required" });
  }

  const existingUser = findUserByPhone(phone);
  if (existingUser) {
    console.log("User already exists:", existingUser.id);
    return res.status(200).json({ message: "User already exists", user: existingUser });
  }

  const newUser: User = {
    id: firebaseUid || Math.random().toString(36).substr(2, 9),
    phone,
    created_at: new Date().toISOString(),
    wallet_balance: config.initialWalletBalance,
    trust_score: config.defaultTrustScore,
    transactions: [],
  };

  console.log("Creating new user:", newUser.id);
  saveUser(newUser);
  res.status(201).json({ message: "User registered successfully", user: newUser });
});

router.get("/profile/:id", (req, res) => {
  const user = users.get(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

export default router;
