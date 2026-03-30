import express from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";
import authRoutes from "./api/auth";
import walletRoutes from "./api/wallet";
import trustRoutes from "./api/trust";
import lumozaRoutes from "./api/lumoza";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/wallet", walletRoutes);
  app.use("/api/trust", trustRoutes);
  app.use("/api/lumoza", lumozaRoutes);

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Kulima Africa Backend" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
