import { Achievement, PlayerAchievement } from "../models/achievement.model.js";
import { PlayerProfile } from "../models/playerProfile.model.js";
import { PlayerProgress } from "../models/playerProgress.model.js";

const achievementSeeds = [
  {
    key: "first-debate",
    title: "First Debate",
    description: "Win your first turn in Story Mode.",
    rewardXP: 50,
    rewardCoins: 20,
  },
  {
    key: "first-victory",
    title: "First Victory",
    description: "Pass your first round in Story Mode.",
    rewardXP: 120,
    rewardCoins: 40,
  },
  {
    key: "perfect-round",
    title: "Perfect Round",
    description: "Complete a round with every turn answered with the strongest argument.",
    rewardXP: 200,
    rewardCoins: 75,
  },
  {
    key: "boss-slayer",
    title: "Boss Slayer",
    description: "Defeat a boss round and unlock the next chapter.",
    rewardXP: 300,
    rewardCoins: 120,
  },
  {
    key: "perfect-chapter",
    title: "Perfect Chapter",
    description: "Complete an entire chapter without dropping below the passing score.",
    rewardXP: 400,
    rewardCoins: 200,
  },
  {
    key: "master-debater",
    title: "Master Debater",
    description: "Earn a top star rating across five chapters.",
    rewardXP: 600,
    rewardCoins: 300,
  },
];

export const ensureAchievements = async () => {
  await Promise.all(
    achievementSeeds.map((achievement) =>
      Achievement.findOrCreate({
        where: { key: achievement.key },
        defaults: achievement,
      })
    )
  );
};

export const grantAchievement = async (playerId, key) => {
  const achievement = await Achievement.findOne({ where: { key } });
  if (!achievement) return null;

  const existing = await PlayerAchievement.findOne({
    where: { playerId, achievementId: achievement.id },
  });
  if (existing) return null;

  await PlayerAchievement.create({
    playerId,
    achievementId: achievement.id,
  });

  const profile = await PlayerProfile.findOne({ where: { playerId } });
  if (profile) {
    await profile.increment({
      xp: achievement.rewardXP,
      coins: achievement.rewardCoins,
    });
  }

  return achievement;
};

export const fetchAchievements = async (playerId) => {
  return await PlayerAchievement.findAll({
    where: { playerId },
    include: Achievement,
    order: [[Achievement, "rewardXP", "DESC"]],
  });
};

export const getMasterDebaterAchievement = async (playerId) => {
  const achievement = await Achievement.findOne({ where: { key: "master-debater" } });
  if (!achievement) return null;

  const existing = await PlayerAchievement.findOne({
    where: { playerId, achievementId: achievement.id },
  });
  if (existing) return null;

  await PlayerAchievement.create({
    playerId,
    achievementId: achievement.id,
  });

  const profile = await PlayerProfile.findOne({ where: { playerId } });
  if (profile) {
    await profile.increment({
      xp: achievement.rewardXP,
      coins: achievement.rewardCoins,
    });
  }

  return achievement;
};

export const evaluateAchievements = async ({
  playerId,
  roundPassed,
  perfectRound,
  bossRound,
  chapterCompleted,
  chaptersWithStarRating,
}) => {
  const earned = [];

  if (roundPassed) {
    const achievement = await grantAchievement(playerId, "first-victory");
    if (achievement) earned.push(achievement);
  }

  if (perfectRound) {
    const achievement = await grantAchievement(playerId, "perfect-round");
    if (achievement) earned.push(achievement);
  }

  if (bossRound && roundPassed) {
    const achievement = await grantAchievement(playerId, "boss-slayer");
    if (achievement) earned.push(achievement);
  }

  if (chapterCompleted) {
    const achievement = await grantAchievement(playerId, "perfect-chapter");
    if (achievement) earned.push(achievement);
  }

  if (chaptersWithStarRating >= 5) {
    const achievement = await grantAchievement(playerId, "master-debater");
    if (achievement) earned.push(achievement);
  }

  return earned;
};
