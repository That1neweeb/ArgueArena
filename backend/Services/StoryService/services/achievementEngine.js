// import { Achievement, PlayerAchievement } from "../models/achievement.model.js";
// import { PlayerProfile } from "../models/playerProfile.model.js";
// import { PlayerProgress } from "../models/playerProgress.model.js";

// const achievementSeeds = [
//   {
//     key: "first-debate",
//     title: "First Debate",
//     description: "Win your first turn in Story Mode.",
//     rewardXP: 50,
//     rewardCoins: 20,
//   },
//   {
//     key: "first-victory",
//     title: "First Victory",
//     description: "Pass your first round in Story Mode.",
//     rewardXP: 120,
//     rewardCoins: 40,
//   },
//   {
//     key: "perfect-round",
//     title: "Perfect Round",
//     description: "Complete a round with every turn answered with the strongest argument.",
//     rewardXP: 200,
//     rewardCoins: 75,
//   },
//   {
//     key: "boss-slayer",
//     title: "Boss Slayer",
//     description: "Defeat a boss round and unlock the next chapter.",
//     rewardXP: 300,
//     rewardCoins: 120,
//   },
//   {
//     key: "perfect-chapter",
//     title: "Perfect Chapter",
//     description: "Complete an entire chapter without dropping below the passing score.",
//     rewardXP: 400,
//     rewardCoins: 200,
//   },
//   {
//     key: "master-debater",
//     title: "Master Debater",
//     description: "Earn a top star rating across five chapters.",
//     rewardXP: 600,
//     rewardCoins: 300,
//   },
// ];

// export const ensureAchievements = async () => {
//   await Promise.all(
//     achievementSeeds.map((achievement) =>
//       Achievement.findOrCreate({
//         where: { key: achievement.key },
//         defaults: achievement,
//       })
//     )
//   );
// };

// export const grantAchievement = async (playerId, key) => {
//   const achievement = await Achievement.findOne({ where: { key } });
//   if (!achievement) return null;

//   const existing = await PlayerAchievement.findOne({
//     where: { playerId, achievementId: achievement.id },
//   });
//   if (existing) return null;

//   await PlayerAchievement.create({
//     playerId,
//     achievementId: achievement.id,
//   });

//   const profile = await PlayerProfile.findOne({ where: { playerId } });
//   if (profile) {
//     await profile.increment({
//       xp: achievement.rewardXP,
//       coins: achievement.rewardCoins,
//     });
//   }

//   return achievement;
// };

// export const fetchAchievements = async (playerId) => {
//   return await PlayerAchievement.findAll({
//     where: { playerId },
//     include: Achievement,
//     order: [[Achievement, "rewardXP", "DESC"]],
//   });
// };

// export const getMasterDebaterAchievement = async (playerId) => {
//   const achievement = await Achievement.findOne({ where: { key: "master-debater" } });
//   if (!achievement) return null;

//   const existing = await PlayerAchievement.findOne({
//     where: { playerId, achievementId: achievement.id },
//   });
//   if (existing) return null;

//   await PlayerAchievement.create({
//     playerId,
//     achievementId: achievement.id,
//   });

//   const profile = await PlayerProfile.findOne({ where: { playerId } });
//   if (profile) {
//     await profile.increment({
//       xp: achievement.rewardXP,
//       coins: achievement.rewardCoins,
//     });
//   }

//   return achievement;
// };

// export const evaluateAchievements = async ({
//   playerId,
//   roundPassed,
//   perfectRound,
//   bossRound,
//   chapterCompleted,
//   chaptersWithStarRating,
// }) => {
//   const earned = [];

//   if (roundPassed) {
//     const achievement = await grantAchievement(playerId, "first-victory");
//     if (achievement) earned.push(achievement);
//   }

//   if (perfectRound) {
//     const achievement = await grantAchievement(playerId, "perfect-round");
//     if (achievement) earned.push(achievement);
//   }

//   if (bossRound && roundPassed) {
//     const achievement = await grantAchievement(playerId, "boss-slayer");
//     if (achievement) earned.push(achievement);
//   }

//   if (chapterCompleted) {
//     const achievement = await grantAchievement(playerId, "perfect-chapter");
//     if (achievement) earned.push(achievement);
//   }

//   if (chaptersWithStarRating >= 5) {
//     const achievement = await grantAchievement(playerId, "master-debater");
//     if (achievement) earned.push(achievement);
//   }

//   return earned;
// };





// services/achievementEngine.js
// ================================================================
// All achievement definitions live here.
// storyEngine.js calls evaluateAchievements() and gets back
// an array of newly-granted Achievement rows to send to the client.
// ================================================================

import { Achievement, PlayerAchievement } from "../models/achievement.model.js";
import { PlayerProfile } from "../models/playerProfile.model.js";
import { Chapter } from "../models/chapter.model.js";
import { PlayerProgress } from "../models/playerProgress.model.js";

// ----------------------------------------------------------------
// Master seed list — every achievement the game has.
// Keys are stable identifiers that never change after shipping.
// ----------------------------------------------------------------

const ACHIEVEMENT_SEEDS = [

  // Story Mode — one per chapter
  { key: "welcome",    title: "Welcome Challenger",    description: "Enter Story Mode for the first time.",            icon: "🎓", category: "Story Mode",   rarity: "Common",    rewardXP: 25,  rewardCoins: 10  },
  { key: "commons",    title: "The Commons Conqueror", description: "Complete Chapter 1.",                             icon: "🏛️", category: "Story Mode",   rarity: "Common",    rewardXP: 50,  rewardCoins: 20  },
  { key: "forum",      title: "Forum Victor",          description: "Complete Chapter 2.",                             icon: "⚔️", category: "Story Mode",   rarity: "Common",    rewardXP: 50,  rewardCoins: 20  },
  { key: "apex",       title: "Apex Strategist",       description: "Complete Chapter 3.",                             icon: "🧠", category: "Story Mode",   rarity: "Rare",      rewardXP: 75,  rewardCoins: 30  },
  { key: "assembly",   title: "Assembly Hero",         description: "Complete Chapter 4.",                             icon: "⚖️", category: "Story Mode",   rarity: "Rare",      rewardXP: 75,  rewardCoins: 30  },
  { key: "symposium",  title: "Symposium Scholar",     description: "Complete Chapter 5.",                             icon: "📚", category: "Story Mode",   rarity: "Epic",      rewardXP: 100, rewardCoins: 40  },
  { key: "arena",      title: "Arena Survivor",        description: "Complete Chapter 6.",                             icon: "🛡️", category: "Story Mode",   rarity: "Epic",      rewardXP: 100, rewardCoins: 40  },
  { key: "council",    title: "Council Strategist",    description: "Complete Chapter 7.",                             icon: "👥", category: "Story Mode",   rarity: "Epic",      rewardXP: 120, rewardCoins: 50  },
  { key: "parliament", title: "Parliament Master",     description: "Complete Chapter 8.",                             icon: "🏆", category: "Story Mode",   rarity: "Legendary", rewardXP: 150, rewardCoins: 60  },
  { key: "odyssey",    title: "Journey Complete",      description: "Complete Chapter 9.",                             icon: "👑", category: "Story Mode",   rarity: "Legendary", rewardXP: 250, rewardCoins: 100 },

  // Boss Battles
  { key: "boss1",      title: "First Victory",         description: "Defeat your first NPC boss.",                    icon: "🥇", category: "Boss Battles", rarity: "Common",    rewardXP: 40,  rewardCoins: 15  },
  { key: "boss5",      title: "Elite Debater",         description: "Defeat 5 NPC bosses.",                           icon: "🔥", category: "Boss Battles", rarity: "Rare",      rewardXP: 100, rewardCoins: 40  },
  { key: "boss9",      title: "Arena Champion",        description: "Defeat every Story Mode boss.",                  icon: "👑", category: "Boss Battles", rarity: "Legendary", rewardXP: 300, rewardCoins: 120 },

  // Skill
  { key: "first-victory",   title: "First Victory",     description: "Pass your first round in Story Mode.",          icon: "🥇", category: "Skill",        rarity: "Common",    rewardXP: 120, rewardCoins: 40  },
  { key: "perfect-round",   title: "Perfect Round",     description: "Complete a round choosing the best argument every single turn.", icon: "💯", category: "Skill", rarity: "Epic", rewardXP: 200, rewardCoins: 75 },
  { key: "boss-slayer",     title: "Boss Slayer",       description: "Defeat a boss round and unlock the next chapter.", icon: "🗡️", category: "Skill",     rarity: "Rare",      rewardXP: 300, rewardCoins: 120 },
  { key: "perfect-chapter", title: "Perfect Chapter",   description: "Complete a full chapter without failing a single round.", icon: "🌟", category: "Skill", rarity: "Legendary", rewardXP: 400, rewardCoins: 200 },
  { key: "master-debater",  title: "Master Debater",    description: "Earn a top star rating across five chapters.",  icon: "🏅", category: "Skill",        rarity: "Legendary", rewardXP: 600, rewardCoins: 300 },

  // Special
  { key: "completionist", title: "Completionist", description: "Unlock every other achievement.", icon: "🌟", category: "Special", rarity: "Legendary", rewardXP: 500, rewardCoins: 250 },
];

// Chapter number → achievement key
const CHAPTER_KEY = {
  1: "commons",
  2: "forum",
  3: "apex",
  4: "assembly",
  5: "symposium",
  6: "arena",
  7: "council",
  8: "parliament",
  9: "odyssey",
};


// ================================================================
// ensureAchievements
// Called at startup — upserts every seed so the DB always matches.
// ================================================================

export const ensureAchievements = async () => {
  await Promise.all(
    ACHIEVEMENT_SEEDS.map((seed) =>
      Achievement.findOrCreate({ where: { key: seed.key }, defaults: seed })
    )
  );
  console.log(`✅ ${ACHIEVEMENT_SEEDS.length} achievements ready.`);
};


// ================================================================
// grantAchievement (internal)
// Grants one achievement by key. Idempotent — never double-grants.
// Returns the Achievement row if newly granted, null if already had it.
// ================================================================

const grantAchievement = async (playerId, key) => {
  const achievement = await Achievement.findOne({ where: { key } });
  if (!achievement) {
    console.warn(`grantAchievement: unknown key "${key}"`);
    return null;
  }

  const [, created] = await PlayerAchievement.findOrCreate({
    where: { playerId, achievementId: achievement.id },
    defaults: { playerId, achievementId: achievement.id },
  });

  if (!created) return null; // already earned, nothing to do

  // Award XP + coins
  const profile = await PlayerProfile.findOne({ where: { playerId } });
  if (profile) {
    await profile.increment({ xp: achievement.rewardXP, coins: achievement.rewardCoins });
  }

  return achievement;
};


// ================================================================
// checkCompletionist (internal)
// Fires after every unlock to see if all others are done.
// ================================================================

const checkCompletionist = async (playerId) => {
  const totalOthers = ACHIEVEMENT_SEEDS.filter((s) => s.key !== "completionist").length;

  const earnedCount = await PlayerAchievement.count({ where: { playerId } });

  // earnedCount includes the just-granted one, completionist not yet granted
  if (earnedCount >= totalOthers) {
    return await grantAchievement(playerId, "completionist");
  }
  return null;
};


// ================================================================
// evaluateAchievements
// The single entry point storyEngine.js calls.
// Returns Achievement[] — only the ones newly granted this call.
// ================================================================

export const evaluateAchievements = async ({
  playerId,
  chapterId,        // needed to look up chapterNumber for story achievements

  // Round-level
  roundPassed,
  perfectRound,     // every turn was quality === 2
  bossRound,
  maxScore,         // maximum possible score for this round
  roundScore,       // actual score the player got

  // Chapter-level
  chapterCompleted, // true when the boss round was passed
  chapterHadNoFailures, // true if player never failed a round in this chapter
}) => {
  const earned = [];

  const grant = async (key) => {
    const result = await grantAchievement(playerId, key);
    if (result) {
      earned.push(result);
      // Check completionist after every new unlock
      const completionist = await checkCompletionist(playerId);
      if (completionist) earned.push(completionist);
    }
  };

  // ── Round passed ──────────────────────────────────────────────
  if (roundPassed) {
    await grant("first-victory");
    if (perfectRound) await grant("perfect-round");
  }

  // ── Boss round won ────────────────────────────────────────────
  if (bossRound && roundPassed) {
    await grant("boss-slayer");

    // Count total boss wins across all chapters for this player
    const bossWins = await PlayerProgress.count({
      where: { playerId, chapterCompleted: true },
    });
    if (bossWins >= 1) await grant("boss1");
    if (bossWins >= 5) await grant("boss5");
    if (bossWins >= 9) await grant("boss9");
  }

  // ── Chapter completed ─────────────────────────────────────────
  if (chapterCompleted && chapterId) {
    // Look up which chapter number this is to pick the right key
    const chapter = await Chapter.findByPk(chapterId);
    if (chapter) {
      const chapterKey = CHAPTER_KEY[chapter.chapterNumber];
      if (chapterKey) await grant(chapterKey);
    }

    // Perfect chapter: player never failed a round
    if (chapterHadNoFailures) await grant("perfect-chapter");

    // Master Debater: count completed chapters
    const completedCount = await PlayerProgress.count({
      where: { playerId, chapterCompleted: true },
    });
    if (completedCount >= 5) await grant("master-debater");
  }

  return earned;
};


// ================================================================
// fetchAchievements
// Returns all achievements merged with this player's unlock status.
// Used by GET /achievements.
// ================================================================

export const fetchAchievements = async (playerId) => {
  const all = await Achievement.findAll({ order: [["rewardXP", "ASC"]] });
  const earned = await PlayerAchievement.findAll({ where: { playerId } });

  const earnedMap = new Map(earned.map((e) => [e.achievementId, e.earnedAt]));

  return all.map((a) => ({
    ...a.toJSON(),
    unlocked: earnedMap.has(a.id),
    earnedAt: earnedMap.get(a.id) || null,
  }));
};


// ================================================================
// grantWelcome
// Call when a player first enters Story Mode.
// ================================================================

export const grantWelcome = async (playerId) => {
  const achievement = await grantAchievement(playerId, "welcome");
  return achievement ? [achievement] : [];
};


// ================================================================
// getMasterDebaterAchievement
// Kept for backward compatibility — storyEngine.js calls this.
// Now just delegates to grantAchievement.
// ================================================================

export const getMasterDebaterAchievement = async (playerId) => {
  return await grantAchievement(playerId, "master-debater");
};