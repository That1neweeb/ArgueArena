// ========================================================
// Achievement Manager
// Handles saving/loading/unlocking achievements
// ========================================================

import { ACHIEVEMENTS } from "./AchievementData";
import { addXP } from "../../gameData/playerProgress";

const STORAGE_KEY = "argueArenaAchievements";


// ========================================================
// Create default save
// Called only the first time the game is opened.
// ========================================================

function createDefaultAchievements() {

    const save = {};

    ACHIEVEMENTS.forEach((achievement) => {

        save[achievement.id] = {

            unlocked: false,

            dateUnlocked: null,

        };

    });

    return save;

}


// ========================================================
// Load save
// ========================================================

export function loadAchievements() {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {

        const defaults = createDefaultAchievements();

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaults)
        );

        return defaults;

    }

    return JSON.parse(saved);

}


// ========================================================
// Save
// ========================================================

export function saveAchievements(data) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );

}


// ========================================================
// Unlock an achievement
// ========================================================

/*
-----------------------------------------
Unlock Achievement
-----------------------------------------
*/

export function unlockAchievement(id) {

    const achievements = loadAchievements();
    if (!achievements[id]) return;

    // already unlocked
    if (achievements[id].unlocked) return;
    achievements[id].unlocked = true;
    achievements[id].dateUnlocked =
        // new Date().toLocaleDateString();
        new Date().toISOString().split("T")[0]
    saveAchievements(achievements);

    // =======================================
// ADDED
// Give XP for this achievement
// =======================================

const achievement = ACHIEVEMENTS.find(

    item => item.id === id

);

if(achievement){

    addXP(achievement.xp);

}

// =======================================
// CHECK FOR COMPLETIONIST
// Unlock when every other achievement
// has been unlocked.
// =======================================

const unlockedCount = Object.entries(achievements).filter(

    ([achievementId, achievement]) =>

        achievementId !== "completionist" &&
        achievement.unlocked

).length;


// Total achievements except Completionist

const totalWithoutCompletionist =
    ACHIEVEMENTS.length - 1;


// Unlock Completionist

if (

    unlockedCount === totalWithoutCompletionist &&

    !achievements["completionist"].unlocked

){

    achievements["completionist"].unlocked = true;

    achievements["completionist"].dateUnlocked =
        new Date().toLocaleDateString();

    saveAchievements(achievements);

    addXP(

        ACHIEVEMENTS.find(

            item => item.id === "completionist"

        ).xp

    );

    // ===========================
    // NEW
    // Tell the whole game
    // that an achievement unlocked.
    // ===========================

    window.dispatchEvent(
        new CustomEvent("achievementUnlocked",{
            detail:id,

        })

    );

}


// ========================================================
// Is unlocked?
// ========================================================
}

export function isAchievementUnlocked(id) {

    const achievements = loadAchievements();

    return achievements[id]?.unlocked || false;

}


// ========================================================
// Get one achievement
// ========================================================

export function getAchievement(id) {

    const achievements = loadAchievements();

    return achievements[id];

}


// ========================================================
// Count unlocked achievements
// ========================================================

export function getUnlockedCount() {

    const achievements = loadAchievements();

    let count = 0;

    Object.values(achievements).forEach((achievement) => {

        if (achievement.unlocked) {

            count++;

        }

    });

    return count;

}


// ========================================================
// Total achievements
// ========================================================

export function getTotalAchievements() {

    return ACHIEVEMENTS.length;

}


// ========================================================
// Progress percentage
// ========================================================

export function getProgressPercentage() {

    return (

        getUnlockedCount()

        /

        getTotalAchievements()

    ) * 100;

}


// ========================================================
// Get every achievement with its unlock state
//
// This is used by Achievements.jsx
// ========================================================

export function getAchievementsWithStatus() {

    const save = loadAchievements();

    return ACHIEVEMENTS.map((achievement) => ({

        ...achievement,

        unlocked: save[achievement.id]?.unlocked || false,

        dateUnlocked: save[achievement.id]?.dateUnlocked || null,

    }));

}


// ========================================================
// Developer Reset
//
// Use while testing.
// Delete before final release.
// ========================================================

export function resetAchievements() {

    localStorage.removeItem(STORAGE_KEY);

}


/*
-----------------------------------------
Get ALL achievements
-----------------------------------------
*/

export function getAllAchievements() {
    return loadAchievements();
}
