// AchievementData.js
//database only nothing unlocks anything.
export const ACHIEVEMENTS = [

  // -----------------------------
  // STORY MODE
  // -----------------------------

  {
    id: "welcome",
    title: "Welcome Challenger",
    description: "Enter Story Mode for the first time.",
    icon: "🎓",
    category: "Story Mode",
    rarity: "Common",
    xp: 25,
  },

  {
    id: "commons",
    title: "The Commons Conqueror",
    description: "Complete Stage 1.",
    icon: "🏛️",
    category: "Story Mode",
    rarity: "Common",
    xp: 50,
  },

  {
    id: "forum",
    title: "Forum Victor",
    description: "Complete Stage 2.",
    icon: "⚔️",
    category: "Story Mode",
    rarity: "Common",
    xp: 50,
  },

  {
    id: "apex",
    title: "Apex Strategist",
    description: "Complete Stage 3.",
    icon: "🧠",
    category: "Story Mode",
    rarity: "Rare",
    xp: 75,
  },

  {
    id: "assembly",
    title: "Assembly Hero",
    description: "Complete Stage 4.",
    icon: "⚖️",
    category: "Story Mode",
    rarity: "Rare",
    xp: 75,
  },

  {
    id: "symposium",
    title: "Symposium Scholar",
    description: "Complete Stage 5.",
    icon: "📚",
    category: "Story Mode",
    rarity: "Epic",
    xp: 100,
  },

  {
    id: "arena",
    title: "Arena Survivor",
    description: "Complete Stage 6.",
    icon: "🛡️",
    category: "Story Mode",
    rarity: "Epic",
    xp: 100,
  },

  {
    id: "council",
    title: "Council Strategist",
    description: "Complete Stage 7.",
    icon: "👥",
    category: "Story Mode",
    rarity: "Epic",
    xp: 120,
  },

  {
    id: "parliament",
    title: "Parliament Master",
    description: "Complete Stage 8.",
    icon: "🏆",
    category: "Story Mode",
    rarity: "Legendary",
    xp: 150,
  },

  {
    id: "odyssey",
    title: "Journey Complete",
    description: "Complete Stage 9.",
    icon: "👑",
    category: "Story Mode",
    rarity: "Legendary",
    xp: 250,
  },

  // -----------------------------
  // NPC BOSSES
  // -----------------------------

  {
    id: "boss1",
    title: "First Victory",
    description: "Defeat your first NPC.",
    icon: "🥇",
    category: "Boss Battles",
    rarity: "Common",
    xp: 40,
  },

  {
    id: "boss5",
    title: "Elite Debater",
    description: "Defeat 5 NPCs.",
    icon: "🔥",
    category: "Boss Battles",
    rarity: "Rare",
    xp: 100,
  },

  {
    id: "boss9",
    title: "Arena Champion",
    description: "Defeat every Story Mode boss.",
    icon: "👑",
    category: "Boss Battles",
    rarity: "Legendary",
    xp: 300,
  },

  // -----------------------------
  // DAILY MODE
  // -----------------------------

  {
    id: "daily1",
    title: "Daily Challenger",
    description: "Complete your first Daily Debate.",
    icon: "📅",
    category: "Daily Debate",
    rarity: "Common",
    xp: 25,
  },

  {
    id: "daily5",
    title: "Debate Streak",
    description: "Win 5 Daily Debates.",
    icon: "🔥",
    category: "Daily Debate",
    rarity: "Rare",
    xp: 80,
  },

  {
    id: "daily20",
    title: "Daily Master",
    description: "Win 20 Daily Debates.",
    icon: "⭐",
    category: "Daily Debate",
    rarity: "Epic",
    xp: 150,
  },

  // -----------------------------
  // SKILL
  // -----------------------------

  {
    id: "critical",
    title: "Critical Thinker",
    description: "Score above 90% in a debate.",
    icon: "🧠",
    category: "Skill",
    rarity: "Epic",
    xp: 150,
  },

  {
    id: "perfect",
    title: "Perfect Argument",
    description: "Get a perfect debate score.",
    icon: "💯",
    category: "Skill",
    rarity: "Legendary",
    xp: 200,
  },

  // -----------------------------
  // SECRET
  // -----------------------------

  {
    id: "completionist",
    title: "Completionist",
    description: "Unlock every achievement.",
    icon: "🌟",
    category: "Special",
    rarity: "Legendary",
    xp: 500,
  },

];