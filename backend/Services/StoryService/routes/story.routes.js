import express from "express";
import storyController from "../controller/story.controller.js";
import { verifyToken } from "../../AuthService/auth.middleware.js";

const router = express.Router();

// ===============================
// All Story Mode routes require login
// ===============================
router.use(verifyToken);

// =====================================
// Story Map
// =====================================

// Get all chapters with player progress
router.get(
  "/chapters",
  storyController.getChapters
);

// =====================================
// Battle
// =====================================

// Get round information
router.get(
  "/chapter/:chapterId/round/:roundNumber",
  storyController.getRound
);

// Get a specific debate turn
router.get(
  "/turn/:debateId/:turnNumber",
  storyController.getTurn
);

// Submit selected option
router.post(
  "/turn",
  storyController.submitTurn
);

// Finish round
router.post(
  "/finish-round",
  storyController.finishRound
);

// Finish chapter
router.post(
  "/finish-chapter",
  storyController.finishChapter
);

// Player profile
router.get(
  "/profile",
  storyController.getProfile
);

// Player achievements
router.get(
  "/achievements",
  storyController.getAchievements
);

export default router;