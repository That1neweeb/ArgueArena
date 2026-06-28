import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import storyRoutes from "./routes/story.routes.js";
import { connection } from "../../config/db.js";
import { initializeContent } from "./content/loader.js";
import { ensureAchievements } from "./services/achievementEngine.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.STORY_SERVICE_PORT || 3002;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3001", `http://localhost:${PORT}`],
    credentials: true,
  })
);

app.use("/api/story", storyRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Story Service online" });
});

const start = async () => {
  await connection();
  await initializeContent();
  await ensureAchievements();
  app.listen(PORT, () => {
    console.log(`Story Service is live on port: ${PORT}`);
  });
};

start().catch((error) => {
  console.error("Story Service failed to start", error);
  process.exit(1);
});
