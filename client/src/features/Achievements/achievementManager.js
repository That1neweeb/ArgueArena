//achievement page asks achievement manager asks localstorage.

import { ACHIEVEMENTS } from "./AchievementData";

const STORAGE_KEY = "argueArenaAchievements";

/*
-----------------------------------------
Create Default Achievement Save
-----------------------------------------
*/

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

/*
-----------------------------------------
Load Achievements
-----------------------------------------
*/

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

/*
-----------------------------------------
Save Achievements
-----------------------------------------
*/

export function saveAchievements(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}

/*
-----------------------------------------
Unlock Achievement
-----------------------------------------
*/

export function unlockAchievement(id) {

    const achievements = loadAchievements();

    if (!achievements[id]) return;

    if (achievements[id].unlocked) return;

    achievements[id].unlocked = true;

    achievements[id].dateUnlocked = new Date().toLocaleDateString();

    saveAchievements(achievements);

}

/*
-----------------------------------------
Check if unlocked
-----------------------------------------
*/

export function isAchievementUnlocked(id) {

    const achievements = loadAchievements();

    return achievements[id]?.unlocked || false;

}

/*
-----------------------------------------
Get Achievement
-----------------------------------------
*/

export function getAchievement(id) {

    const achievements = loadAchievements();

    return achievements[id];

}

/*
-----------------------------------------
Reset ALL Achievements

(Useful while developing)

Delete later if you want.
-----------------------------------------
*/

export function resetAchievements() {

    localStorage.removeItem(STORAGE_KEY);

}

/*
-----------------------------------------
Count unlocked achievements
-----------------------------------------
*/

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

/*
-----------------------------------------
Total achievements
-----------------------------------------
*/

export function getTotalAchievements() {

    return ACHIEVEMENTS.length;

}

/*
-----------------------------------------
Progress %
-----------------------------------------
*/

export function getProgressPercentage() {

    return (
        (getUnlockedCount() /
            getTotalAchievements()) * 100
    );

}