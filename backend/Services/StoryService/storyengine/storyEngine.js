// import { Chapter, Debate, DebateTurn, ArgumentOption, NPC } from "../models/index.js";
// import {
//   loadRound,
//   loadTurn,
//   loadOptions,
//   processTurn,
// } from "../services/battleEngine.js";

// import { calculateOptionScore } from "../services/scoreCalculator.js";
// import {
//   getPlayerProfile,
//   getChapterProgress,
//   updateTurnProgress,
//   completeRoundProgress,
//   completeChapterProgress,
//   awardProfileRewards,
// } from "../services/progressEngine.js";
// import { calculateReward } from "../services/rewardEngine.js";
// import { evaluateAchievements, getMasterDebaterAchievement, fetchAchievements } from "../services/achievementEngine.js";
// import { unlockNextChapter } from "../services/unlockService.js";

// export const buildChapterList = async (playerId) => {
//   const chapters = await Chapter.findAll({
//     include: NPC,
//     order: [["chapterNumber", "ASC"]],
//   });

//   const progress = await Promise.all(
//     chapters.map(async (chapter) => {
//       const p = await getChapterProgress(playerId, chapter.id);
//       return { chapterId: chapter.id, progress: p };
//     })
//   );

//   const profile = await getPlayerProfile(playerId);

//   return await Promise.all(
//     chapters.map(async (chapter) => {
//       const playerProgress = progress.find((item) => item.chapterId === chapter.id)?.progress;
//       const firstDebate = await Debate.findOne({
//         where: { chapterId: chapter.id, roundNumber: 1 },
//       });

//       return {
//         ...chapter.toJSON(),
//         npc: chapter.NPC,
//         progress: playerProgress ? playerProgress.toJSON() : null,
//         unlocked: chapter.unlocked || profile.unlockedChapters.includes(chapter.chapterNumber),
//         firstDebateId: firstDebate?.id || null,
//       };
//     })
//   );
// };

// export const loadRoundDetails = async (chapterId, roundNumber, playerId) => {
//   const chapter = await Chapter.findByPk(chapterId, { include: NPC });
//   if (!chapter) throw new Error("Chapter not found.");

//   const debate = await loadRound(chapterId, roundNumber);
//   const progress = await getChapterProgress(playerId, chapterId);
//   const maxScore = debate.numberOfTurns * 2;

//   return {
//     chapter: chapter.toJSON(),
//     debate: debate.toJSON(),
//     progress: progress.toJSON(),
//     maxScore,
//   };
// };

// const shuffleOptions = (items) => {
//   const shuffled = [...items];
//   for (let i = shuffled.length - 1; i > 0; i -= 1) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
// };

// export const loadTurnDetails = async (debateId, turnNumber, playerId) => {
//   const turn = await loadTurn(debateId, turnNumber);
//   const options = await loadOptions(turn.id);
//   const debate = await Debate.findByPk(debateId);
//   if (!debate) throw new Error("Debate not found.");

//   const chapter = await Chapter.findByPk(debate.chapterId, { include: NPC });

//   const detail = {
//     turn: turn.toJSON(),
//     options: shuffleOptions(options.map((option) => option.toJSON())),
//     debateId,
//     roundNumber: debate.roundNumber,
//     chapterId: debate.chapterId,
//     bossRound: debate.bossRound,
//     numberOfTurns: debate.numberOfTurns,
//     passingScore: debate.passingScore,
//     npc: chapter?.NPC ? chapter.NPC.toJSON() : null,
//   };

//   return detail;
// };

// export const submitTurnChoice = async ({
//   turnId,
//   optionNumber,
//   playerId,
// }) => {
//   const result = await processTurn(turnId, optionNumber);
//   const earnedScore = calculateOptionScore(result.quality);

//   const option = await ArgumentOption.findOne({
//     where: { turnId, optionNumber },
//   });
//   if (!option) throw new Error("Invalid turn option.");

//   const turn = await DebateTurn.findByPk(turnId);
//   if (!turn) throw new Error("Turn not found.");

//   const debate = await Debate.findByPk(turn.debateId);
//   if (!debate) throw new Error("Debate not found.");

//   await updateTurnProgress({
//     playerId,
//     chapterId: debate.chapterId,
//     currentRound: debate.roundNumber,
//     currentTurn: turn.turnNumber,
//     earnedScore,
//   });

//   return {
//     ...result,
//     earnedScore,
//     debateId: debate.id,
//     chapterId: debate.chapterId,
//     roundNumber: debate.roundNumber,
//   };
// };

// export const finishRoundSession = async ({
//   playerId,
//   chapterId,
//   roundNumber,
//   roundScore,
//   passingScore,
//   bossRound,
// }) => {
//   const debate = await Debate.findOne({
//     where: { chapterId, roundNumber },
//   });
//   const maxScore = (debate?.numberOfTurns || 10) * 2;
//   const reward = calculateReward({ roundScore, passingScore, bossRound, maxScore });
//   const passed = reward.passed;

//   await awardProfileRewards({
//     playerId,
//     xp: reward.xp,
//     coins: reward.coins,
//     stars: reward.stars,
//   });

//   await completeRoundProgress({
//     playerId,
//     chapterId,
//     roundNumber,
//     roundScore,
//     stars: reward.stars,
//     passed,
//   });

//   const chapterCompleted = passed && bossRound;
//   let earnedAchievements = [];
//   if (passed) {
//     earnedAchievements = await evaluateAchievements({
//       playerId,
//       roundPassed: passed,
//       perfectRound: roundScore === maxScore,
//       bossRound,
//       chapterCompleted,
//       chaptersWithStarRating: 0,
//     });
//   }

//   if (chapterCompleted) {
//     await unlockNextChapter(playerId, chapterId);
//   }

//   const profile = await getPlayerProfile(playerId);
//   if (profile.stars >= 15) {
//     const masterDebater = await getMasterDebaterAchievement(playerId);
//     if (masterDebater) earnedAchievements.push(masterDebater);
//   }

//   return {
//     passed,
//     reward,
//     earnedAchievements,
//   };
// };

// export const getProfileDetails = async (playerId) => {
//   const profile = await getPlayerProfile(playerId);
//   return profile.toJSON();
// };

// export const getPlayerAchievements = async (playerId) => {
//   const achievements = await fetchAchievements(playerId);
//   return achievements.map((record) => ({
//     id: record.id,
//     earnedAt: record.earnedAt,
//     ...record.Achievement.toJSON(),
//   }));
// };

// export const finishChapterSession = async ({ playerId, chapterId }) => {
//   const chapter = await Chapter.findByPk(chapterId, { include: NPC });
//   if (!chapter) throw new Error("Chapter not found.");

//   const progress = await getChapterProgress(playerId, chapterId);
//   const alreadyCompleted = progress.chapterCompleted;

//   if (!alreadyCompleted) {
//     await completeChapterProgress({ playerId, chapterId });
//     await unlockNextChapter(playerId, chapterId);
//   }

//   const nextChapter = await Chapter.findOne({
//     where: { chapterNumber: chapter.chapterNumber + 1 },
//   });

//   let earnedAchievements = [];
//   if (!alreadyCompleted) {
//     earnedAchievements = await evaluateAchievements({
//       playerId,
//       roundPassed: true,
//       perfectRound: false,
//       bossRound: true,
//       chapterCompleted: true,
//       chaptersWithStarRating: 0,
//     });
//   }

//   const profile = await getPlayerProfile(playerId);

//   return {
//     chapterCompleted: true,
//     alreadyCompleted,
//     chapter: {
//       ...chapter.toJSON(),
//       npc: chapter.NPC,
//     },
//     nextChapter: nextChapter ? nextChapter.toJSON() : null,
//     earnedAchievements,
//     profile: profile.toJSON(),
//   };
// };




// storyengine/storyEngine.js
// ================================================================

import { Chapter, Debate, DebateTurn, ArgumentOption, NPC } from "../models/index.js";
import {
  loadRound,
  loadTurn,
  loadOptions,
  processTurn,
} from "../services/battleEngine.js";
import { calculateOptionScore } from "../services/scoreCalculator.js";
import {
  getPlayerProfile,
  getChapterProgress,
  updateTurnProgress,
  completeRoundProgress,
  completeChapterProgress,
  awardProfileRewards,
} from "../services/progressEngine.js";
import { calculateReward } from "../services/rewardEngine.js";
import {
  evaluateAchievements,
  fetchAchievements,
  getMasterDebaterAchievement,
  grantWelcome,
} from "../services/achievementEngine.js";
import { unlockNextChapter } from "../services/unlockService.js";

// ================================================================
// buildChapterList
// ================================================================

export const buildChapterList = async (playerId) => {
  // Grant "welcome" the first time — idempotent, safe every call
  await grantWelcome(playerId);

  const chapters = await Chapter.findAll({
    include: NPC,
    order: [["chapterNumber", "ASC"]],
  });

  const progress = await Promise.all(
    chapters.map(async (chapter) => {
      const p = await getChapterProgress(playerId, chapter.id);
      return { chapterId: chapter.id, progress: p };
    })
  );

  const profile = await getPlayerProfile(playerId);

  return await Promise.all(
    chapters.map(async (chapter) => {
      const playerProgress = progress.find((item) => item.chapterId === chapter.id)?.progress;
      const firstDebate = await Debate.findOne({
        where: { chapterId: chapter.id, roundNumber: 1 },
      });

      return {
        ...chapter.toJSON(),
        npc: chapter.NPC,
        progress: playerProgress ? playerProgress.toJSON() : null,
        unlocked: chapter.unlocked || profile.unlockedChapters.includes(chapter.chapterNumber),
        firstDebateId: firstDebate?.id || null,
      };
    })
  );
};

// ================================================================
// loadRoundDetails
// ================================================================

export const loadRoundDetails = async (chapterId, roundNumber, playerId) => {
  const chapter = await Chapter.findByPk(chapterId, { include: NPC });
  if (!chapter) throw new Error("Chapter not found.");

  const debate = await loadRound(chapterId, roundNumber);
  const progress = await getChapterProgress(playerId, chapterId);
  const maxScore = debate.numberOfTurns * 2;

  return {
    chapter: chapter.toJSON(),
    debate: debate.toJSON(),
    progress: progress.toJSON(),
    maxScore,
  };
};

// ================================================================
// loadTurnDetails
// ================================================================

const shuffleOptions = (items) => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const loadTurnDetails = async (debateId, turnNumber, playerId) => {
  const turn = await loadTurn(debateId, turnNumber);
  const options = await loadOptions(turn.id);
  const debate = await Debate.findByPk(debateId);
  if (!debate) throw new Error("Debate not found.");

  const chapter = await Chapter.findByPk(debate.chapterId, { include: NPC });

  return {
    turn: turn.toJSON(),
    options: shuffleOptions(options.map((o) => o.toJSON())),
    debateId,
    roundNumber: debate.roundNumber,
    chapterId: debate.chapterId,
    bossRound: debate.bossRound,
    numberOfTurns: debate.numberOfTurns,
    passingScore: debate.passingScore,
    npc: chapter?.NPC ? chapter.NPC.toJSON() : null,
  };
};

// ================================================================
// submitTurnChoice
// ================================================================

export const submitTurnChoice = async ({ turnId, optionNumber, playerId }) => {
  const result = await processTurn(turnId, optionNumber);
  const earnedScore = calculateOptionScore(result.quality);

  const option = await ArgumentOption.findOne({ where: { turnId, optionNumber } });
  if (!option) throw new Error("Invalid turn option.");

  const turn = await DebateTurn.findByPk(turnId);
  if (!turn) throw new Error("Turn not found.");

  const debate = await Debate.findByPk(turn.debateId);
  if (!debate) throw new Error("Debate not found.");

  await updateTurnProgress({
    playerId,
    chapterId: debate.chapterId,
    currentRound: debate.roundNumber,
    currentTurn: turn.turnNumber,
    earnedScore,
  });

  return {
    ...result,
    earnedScore,
    debateId: debate.id,
    chapterId: debate.chapterId,
    roundNumber: debate.roundNumber,
  };
};

// ================================================================
// finishRoundSession
//
// NEW param: selectedQualities []  (array of quality values 0|1|2
// for every turn the player submitted this round, used for
// perfect-round detection)
// ================================================================

export const finishRoundSession = async ({
  playerId,
  chapterId,
  roundNumber,
  roundScore,
  passingScore,
  bossRound,
  selectedQualities = [], // e.g. [2, 2, 1, 2, 2, 2, 2, 2, 2, 2]
}) => {
  const debate = await Debate.findOne({ where: { chapterId, roundNumber } });
  const maxScore = (debate?.numberOfTurns || 10) * 2;

  const reward = calculateReward({ roundScore, passingScore, bossRound, maxScore });
  const passed = reward.passed;

  // Perfect round = passed AND every turn was the best option (quality 2)
  const perfectRound =
    passed &&
    selectedQualities.length > 0 &&
    selectedQualities.every((q) => q === 2);

  // Award XP/coins/stars regardless of pass/fail (game design choice)
  await awardProfileRewards({
    playerId,
    xp: reward.xp,
    coins: reward.coins,
    stars: reward.stars,
  });

  await completeRoundProgress({
    playerId,
    chapterId,
    roundNumber,
    roundScore,
    stars: reward.stars,
    passed,
  });

  // Chapter is done when the boss round is passed
  const chapterCompleted = passed && bossRound;

  let earnedAchievements = [];

  if (passed) {
    earnedAchievements = await evaluateAchievements({
      playerId,
      chapterId,
      roundPassed: passed,
      perfectRound,
      bossRound,
      maxScore,
      roundScore,
      // chapter-level fields handled in finishChapterSession, not here
      chapterCompleted: false,
      chapterHadNoFailures: false,
    });
  }

  if (chapterCompleted) {
    await unlockNextChapter(playerId, chapterId);
  }

  // Master Debater — keep the existing stars-based check as a safety net
  const profile = await getPlayerProfile(playerId);
  if (profile.stars >= 15) {
    const masterDebater = await getMasterDebaterAchievement(playerId);
    if (masterDebater) earnedAchievements.push(masterDebater);
  }

  return { passed, reward, earnedAchievements };
};

// ================================================================
// finishChapterSession
//
// NEW param: hadNoFailures bool
// The frontend tracks whether the player ever failed a round during
// this chapter and passes it here for the "perfect-chapter" check.
// ================================================================

export const finishChapterSession = async ({
  playerId,
  chapterId,
  hadNoFailures = false, // frontend sends this
}) => {
  const chapter = await Chapter.findByPk(chapterId, { include: NPC });
  if (!chapter) throw new Error("Chapter not found.");

  const progress = await getChapterProgress(playerId, chapterId);
  const alreadyCompleted = progress.chapterCompleted;

  let earnedAchievements = [];

  if (!alreadyCompleted) {
    await completeChapterProgress({ playerId, chapterId });
    await unlockNextChapter(playerId, chapterId);

    // This is where story-mode and boss-count achievements fire
    earnedAchievements = await evaluateAchievements({
      playerId,
      chapterId,
      roundPassed: true,
      perfectRound: false,
      bossRound: true,
      chapterCompleted: true,
      chapterHadNoFailures: hadNoFailures,
    });
  }

  const nextChapter = await Chapter.findOne({
    where: { chapterNumber: chapter.chapterNumber + 1 },
  });

  const profile = await getPlayerProfile(playerId);

  return {
    chapterCompleted: true,
    alreadyCompleted,
    chapter: { ...chapter.toJSON(), npc: chapter.NPC },
    nextChapter: nextChapter ? nextChapter.toJSON() : null,
    earnedAchievements,
    profile: profile.toJSON(),
  };
};

// ================================================================
// getProfileDetails
// ================================================================

export const getProfileDetails = async (playerId) => {
  const profile = await getPlayerProfile(playerId);
  return profile.toJSON();
};

// ================================================================
// getPlayerAchievements
// Returns all achievements with unlock status — used by the
// Achievements page and the GET /achievements route.
// ================================================================

export const getPlayerAchievements = async (playerId) => {
  return await fetchAchievements(playerId);
};