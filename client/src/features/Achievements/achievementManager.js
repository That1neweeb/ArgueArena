// // ========================================================
// // Achievement Manager
// // Handles saving/loading/unlocking achievements
// // ========================================================

// import { ACHIEVEMENTS } from "./AchievementData";
// import { addXP } from "../../gameData/playerProgress";

// const STORAGE_KEY = "argueArenaAchievements";


// // ========================================================
// // Create default save
// // Called only the first time the game is opened.
// // ========================================================

// function createDefaultAchievements() {

//     const save = {};

//     ACHIEVEMENTS.forEach((achievement) => {

//         save[achievement.id] = {

//             unlocked: false,

//             dateUnlocked: null,

//         };

//     });

//     return save;

// }


// // ========================================================
// // Load save
// // ========================================================

// export function loadAchievements() {

//     const saved = localStorage.getItem(STORAGE_KEY);

//     if (!saved) {

//         const defaults = createDefaultAchievements();

//         localStorage.setItem(
//             STORAGE_KEY,
//             JSON.stringify(defaults)
//         );

//         return defaults;

//     }

//     return JSON.parse(saved);

// }


// // ========================================================
// // Save
// // ========================================================

// export function saveAchievements(data) {

//     localStorage.setItem(

//         STORAGE_KEY,

//         JSON.stringify(data)

//     );

// }


// // ========================================================
// // Unlock an achievement
// // ========================================================

// /*
// -----------------------------------------
// Unlock Achievement
// -----------------------------------------
// */

// export function unlockAchievement(id) {

//     const achievements = loadAchievements();
//     if (!achievements[id]) return;

//     // already unlocked
//     if (achievements[id].unlocked) return;
//     achievements[id].unlocked = true;
//     achievements[id].dateUnlocked =
//         // new Date().toLocaleDateString();
//         new Date().toISOString().split("T")[0]
//     saveAchievements(achievements);

//     // =======================================
// // ADDED
// // Give XP for this achievement
// // =======================================

// const achievement = ACHIEVEMENTS.find(

//     item => item.id === id

// );

// if(achievement){

//     addXP(achievement.xp);

// }

// // =======================================
// // CHECK FOR COMPLETIONIST
// // Unlock when every other achievement
// // has been unlocked.
// // =======================================

// const unlockedCount = Object.entries(achievements).filter(

//     ([achievementId, achievement]) =>

//         achievementId !== "completionist" &&
//         achievement.unlocked

// ).length;


// // Total achievements except Completionist

// const totalWithoutCompletionist =
//     ACHIEVEMENTS.length - 1;


// // Unlock Completionist

// if (

//     unlockedCount === totalWithoutCompletionist &&

//     !achievements["completionist"].unlocked

// ){

//     achievements["completionist"].unlocked = true;

//     achievements["completionist"].dateUnlocked =
//         new Date().toLocaleDateString();

//     saveAchievements(achievements);

//     addXP(

//         ACHIEVEMENTS.find(

//             item => item.id === "completionist"

//         ).xp

//     );

//     // ===========================
//     // NEW
//     // Tell the whole game
//     // that an achievement unlocked.
//     // ===========================

//     window.dispatchEvent(
//         new CustomEvent("achievementUnlocked",{
//             detail:id,

//         })

//     );

// }


// // ========================================================
// // Is unlocked?
// // ========================================================
// }

// export function isAchievementUnlocked(id) {

//     const achievements = loadAchievements();

//     return achievements[id]?.unlocked || false;

// }


// // ========================================================
// // Get one achievement
// // ========================================================

// export function getAchievement(id) {

//     const achievements = loadAchievements();

//     return achievements[id];

// }


// // ========================================================
// // Count unlocked achievements
// // ========================================================

// export function getUnlockedCount() {

//     const achievements = loadAchievements();

//     let count = 0;

//     Object.values(achievements).forEach((achievement) => {

//         if (achievement.unlocked) {

//             count++;

//         }

//     });

//     return count;

// }


// // ========================================================
// // Total achievements
// // ========================================================

// export function getTotalAchievements() {

//     return ACHIEVEMENTS.length;

// }


// // ========================================================
// // Progress percentage
// // ========================================================

// export function getProgressPercentage() {

//     return (

//         getUnlockedCount()

//         /

//         getTotalAchievements()

//     ) * 100;

// }


// // ========================================================
// // Get every achievement with its unlock state
// //
// // This is used by Achievements.jsx
// // ========================================================

// export function getAchievementsWithStatus() {

//     const save = loadAchievements();

//     return ACHIEVEMENTS.map((achievement) => ({

//         ...achievement,

//         unlocked: save[achievement.id]?.unlocked || false,

//         dateUnlocked: save[achievement.id]?.dateUnlocked || null,

//     }));

// }


// // ========================================================
// // Developer Reset
// //
// // Use while testing.
// // Delete before final release.
// // ========================================================

// export function resetAchievements() {

//     localStorage.removeItem(STORAGE_KEY);

// }


// /*
// -----------------------------------------
// Get ALL achievements
// -----------------------------------------
// */

// export function getAllAchievements() {
//     return loadAchievements();
// }




// features/Achievements/achievementManager.js  (FRONTEND)
//
// Replaces all localStorage logic with API calls to the Story Service.
// All function names are identical to the old version — no other
// frontend files need to change.
//
// Every function is async because it hits the network.
// ================================================================

import { ACHIEVEMENTS } from "./AchievementData";

const BASE = "http://localhost:3002/api/story";
const KNOWN_UNLOCKED_KEYS = new Set();
let achievementSyncPromise = null;

// ── Internal helpers ────────────────────────────────────────────

function getAuthToken() {
  // token storage varies by your auth implementation.
  // Keep trying common keys.
  return (
    localStorage.getItem("access_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    null
  );
}



async function apiFetch(path, options = {}) {
  const token = getAuthToken();

  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    // Important: backend uses Authorization header, not cookies.
    credentials: "omit",
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `API error ${res.status}`);
  }

  return res.json();
}


function post(path, body = {}) {
  return apiFetch(path, { method: "POST", body: JSON.stringify(body) });
}


// ================================================================
// getAchievementsWithStatus
// Used by your Achievements.jsx page.
//
// Returns:
// [
//   {
//     key, title, description, icon, category, rarity,
//     rewardXP, rewardCoins, unlocked, earnedAt
//   },
//   ...
// ]
// ================================================================

export async function getAchievementsWithStatus() {
  const data = await apiFetch("/achievements");
  return data.achievements;
}

export async function refreshAchievementState() {
  if (achievementSyncPromise) return achievementSyncPromise;

  achievementSyncPromise = (async () => {
    const list = await getAchievementsWithStatus();
    const unlockedKeys = new Set(
      (list || [])
        .filter((achievement) => achievement.unlocked)
        .map((achievement) => achievement.key || achievement.id)
    );

    const newlyUnlocked = [...unlockedKeys].filter(
      (key) => key && !KNOWN_UNLOCKED_KEYS.has(key)
    );

    newlyUnlocked.forEach((key) => KNOWN_UNLOCKED_KEYS.add(key));
    return newlyUnlocked;
  })();

  try {
    return await achievementSyncPromise;
  } finally {
    achievementSyncPromise = null;
  }
}


// ================================================================
// loadAchievements
// Returns a key → status map, same shape as the old localStorage version.
// { "boss1": { unlocked: true, dateUnlocked: "2025-06-01" }, ... }
// ================================================================

export async function loadAchievements() {
  const list = await getAchievementsWithStatus();
  const map = {};
  list.forEach((a) => {
    map[a.key] = {
      unlocked: a.unlocked,
      dateUnlocked: a.earnedAt ? a.earnedAt.split("T")[0] : null,
    };
  });
  return map;
}


// ================================================================
// isAchievementUnlocked
// ================================================================

export async function isAchievementUnlocked(key) {
  const map = await loadAchievements();
  return map[key]?.unlocked || false;
}


// ================================================================
// getAchievement
// ================================================================

export async function getAchievement(key) {
  const map = await loadAchievements();
  return map[key] || { unlocked: false, dateUnlocked: null };
}


// ================================================================
// Counts & progress
// ================================================================

export async function getUnlockedCount() {
  const list = await getAchievementsWithStatus();
  return list.filter((a) => a.unlocked).length;
}

export async function getTotalAchievements() {
  const list = await getAchievementsWithStatus();
  return list.length;
}

export async function getProgressPercentage() {
  const list = await getAchievementsWithStatus();
  if (!list.length) return 0;
  return (list.filter((a) => a.unlocked).length / list.length) * 100;
}


// ================================================================
// Event helpers
// The backend decides which achievements apply — frontend just
// reports what happened and gets back newAchievements[].
// ================================================================

export async function reportRoundFinished(options) {
  return post("/finish-round", options);
}

export async function reportChapterFinished({ chapterId, neverFailed = false }) {
  return post("/finish-chapter", { chapterId, neverFailed });
}


// ================================================================
// Legacy exports used by the rest of the app
// (localStorage-based helpers from old implementation)
// ================================================================

// Keep these functions exported so existing StoryMode imports compile.
// The actual unlock state shown on Achievements page is server-driven.

export async function unlockAchievement(id) {
  if (!id) return null;
  return dispatchAchievementPopups([id]);
}

// Provide stub for perfect score tracking used by Battlescreen.
// If your old logic expects a function, export a function; if it expects a value, this is fine.
export function perfectScore() {
  return 0;
}



// ================================================================
// dispatchAchievementPopups
// Call with the newAchievements[] array from any API response.
// Fires the same custom event AchievementPopup.jsx already listens for.
//
// Usage:
//   const { newAchievements } = await reportRoundFinished({ ... });
//   dispatchAchievementPopups(newAchievements);
// ================================================================

export async function dispatchAchievementPopups(newAchievements = []) {
  const list = await getAchievementsWithStatus();
  const unlockedKeys = new Set(
    (list || [])
      .filter((achievement) => achievement.unlocked)
      .map((achievement) => achievement.key || achievement.id)
  );

  const idsToShow = [];

  (newAchievements || []).forEach((achievement) => {
    const id = typeof achievement === "string" ? achievement : achievement.id;
    if (!id || !unlockedKeys.has(id) || KNOWN_UNLOCKED_KEYS.has(id)) return;

    KNOWN_UNLOCKED_KEYS.add(id);
    idsToShow.push(id);
  });

  idsToShow.forEach((id) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("achievementUnlocked", { detail: id }));
    }
  });

  return idsToShow;
}



// ================================================================
// resetAchievements — DEV ONLY
// ================================================================

export function resetAchievements() {
  console.warn(
    "[Dev] resetAchievements() — add DELETE /api/story/achievements/reset on the backend if needed."
  );
}