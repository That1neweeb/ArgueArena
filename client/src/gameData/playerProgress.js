// =======================================================
// Player Progress Manager
//
// Stores everything related to the player's progress.
//
// Used by:
//
// Story Mode
// Daily Debate
// Achievements
// XP
// Coins
// Future Shop
// Future Leaderboards
// =======================================================

import { unlockAchievement } from "../features/Achievements/achievementManager";

const STORAGE_KEY = "argueArenaPlayerProgress";


// =======================================================
// Create default save
// =======================================================

function defaultProgress() {

    return {

        xp: 0,

        coins: 0,

        stars: 0,

        bossesDefeated: 0,

        dailyWins: 0,

        totalWins: 0,

        completedStages: [],
        perfectScores: 0,

        unlockedChapters: [1],

    };

}


// =======================================================
// Load Progress
// =======================================================

export function loadProgress() {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {

        const progress = defaultProgress();

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(progress)

        );

        return progress;

    }

    return JSON.parse(saved);

}


// =======================================================
// Save Progress
// =======================================================

export function saveProgress(progress) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(progress)

    );

}


// =======================================================
// Add XP
// =======================================================

export function addXP(amount) {

    const progress = loadProgress();

    progress.xp += amount;

    saveProgress(progress);

}


// =======================================================
// Add Coins
// =======================================================

export function addCoins(amount) {

    const progress = loadProgress();

    progress.coins += amount;

    saveProgress(progress);

}


// =======================================================
// Add Stars
// =======================================================

export function addStars(amount) {

    const progress = loadProgress();

    progress.stars += amount;

    saveProgress(progress);

}


// =======================================================
// Boss defeated
// =======================================================

export function defeatBoss() {

    const progress = loadProgress();

    progress.bossesDefeated++;

    // Unlock achievements

    if (progress.bossesDefeated >= 1) {

        unlockAchievement("boss1");

    }

    if (progress.bossesDefeated >= 5) {

        unlockAchievement("boss5");

    }

    if (progress.bossesDefeated >= 9) {

        unlockAchievement("boss9");

    }

    saveProgress(progress);

}


// =======================================================
// Complete Stage
// =======================================================

// =======================================================
// Complete Stage
// =======================================================

export function completeStage(stageNumber) {

    const progress = loadProgress();

    if (!progress.completedStages.includes(stageNumber)) {

        progress.completedStages.push(stageNumber);

    }

    // ----------------------------------
    // Unlock Story Mode Achievements
    // ----------------------------------

    switch(stageNumber){

        case 1:
            unlockAchievement("commons");
            break;

        case 2:
            unlockAchievement("forum");
            break;

        case 3:
            unlockAchievement("apex");
            break;

        case 4:
            unlockAchievement("assembly");
            break;

        case 5:
            unlockAchievement("symposium");
            break;

        case 6:
            unlockAchievement("arena");
            break;

        case 7:
            unlockAchievement("council");
            break;

        case 8:
            unlockAchievement("parliament");
            break;

        case 9:
            unlockAchievement("odyssey");
            break;

        default:
            break;

    }

    saveProgress(progress);

}


// =======================================================
// Daily Debate Won
// =======================================================

export function dailyDebateWon() {

    const progress = loadProgress();

    progress.dailyWins++;

    if (progress.dailyWins >= 1) {

        unlockAchievement("daily1");

    }

    if (progress.dailyWins >= 5) {

        unlockAchievement("daily5");

    }

    if (progress.dailyWins >= 20) {

        unlockAchievement("daily20");

    }

    saveProgress(progress);

}


// =======================================================
// Total Wins
// =======================================================

export function addWin() {

    const progress = loadProgress();

    progress.totalWins++;

    saveProgress(progress);

}

// =======================================================
// Perfect Score
// =======================================================

export function perfectScore() {

    const progress = loadProgress();

    progress.perfectScores++;

    unlockAchievement("perfect");

    saveProgress(progress);

}


// =======================================================
// Unlock Chapter
// =======================================================

export function unlockChapter(chapter) {

    const progress = loadProgress();

    if (!progress.unlockedChapters.includes(chapter)) {

        progress.unlockedChapters.push(chapter);

    }

    saveProgress(progress);

}


// =======================================================
// Developer Reset
// =======================================================

export function resetPlayerProgress() {

    localStorage.removeItem(STORAGE_KEY);

}