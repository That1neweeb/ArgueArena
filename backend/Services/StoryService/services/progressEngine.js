import { PlayerProgress } from "../models/playerProgress.model.js";
import { PlayerProfile } from "../models/playerProfile.model.js";

export const getPlayerProfile = async (playerId) => {
  const [profile] = await PlayerProfile.findOrCreate({
    where: { playerId },
    defaults: {
      playerId,
      xp: 0,
      coins: 0,
      stars: 0,
      unlockedChapters: [1],
      unlockedBadges: [],
      settings: { sound: true, music: true, language: "en" },
    },
  });

  return profile;
};

export const getChapterProgress = async (playerId, chapterId) => {
  const [progress] = await PlayerProgress.findOrCreate({
    where: { playerId, chapterId },
    defaults: {
      playerId,
      chapterId,
      currentRound: 1,
      currentTurn: 1,
      chapterScore: 0,
      chapterCompleted: false,
      completedAt: null,
    },
  });

  return progress;
};

export const updateTurnProgress = async ({
  playerId,
  chapterId,
  currentRound,
  currentTurn,
  earnedScore,
}) => {
  const progress = await getChapterProgress(playerId, chapterId);
  progress.currentRound = Math.max(progress.currentRound, currentRound);
  progress.currentTurn = currentTurn;
  progress.chapterScore += earnedScore;
  await progress.save();

  return progress;
};

export const completeRoundProgress = async ({
  playerId,
  chapterId,
  roundNumber,
  roundScore,
  stars,
  passed,
}) => {
  const progress = await getChapterProgress(playerId, chapterId);
  if (passed) {
    progress.currentRound = Math.max(progress.currentRound, roundNumber + 1);
  }
  progress.currentTurn = 1;
  await progress.save();
  return progress;
};

export const completeChapterProgress = async ({
  playerId,
  chapterId,
}) => {
  const progress = await getChapterProgress(playerId, chapterId);
  progress.chapterCompleted = true;
  progress.completedAt = new Date();
  await progress.save();
  return progress;
};

export const awardProfileRewards = async ({
  playerId,
  xp,
  coins,
  stars,
}) => {
  const profile = await getPlayerProfile(playerId);
  profile.xp += xp;
  profile.coins += coins;
  profile.stars += stars;
  profile.lastAutosaveAt = new Date();
  await profile.save();
  return profile;
};
