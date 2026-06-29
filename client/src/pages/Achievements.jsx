import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Achievements.css";

import { ACHIEVEMENTS } from "../features/Achievements/AchievementData";

import {
    loadAchievements,
    getUnlockedCount,
    getProgressPercentage,
} from "../features/Achievements/AchievementManager";

export default function Achievements() {

    const navigate = useNavigate();

    const [achievementState, setAchievementState] = useState({});

    useEffect(() => {

        setAchievementState(loadAchievements());

    }, []);

    const unlockedCount = getUnlockedCount();

    const progress = getProgressPercentage();

    const groupedAchievements = useMemo(() => {

        const groups = {};

        ACHIEVEMENTS.forEach((achievement) => {

            if (!groups[achievement.category]) {

                groups[achievement.category] = [];

            }

            groups[achievement.category].push(achievement);

        });

        return groups;

    }, []);

    const rarityColor = (rarity) => {

        switch (rarity) {

            case "Common":
                return "#9ca3af";

            case "Rare":
                return "#3b82f6";

            case "Epic":
                return "#9333ea";

            case "Legendary":
                return "#f59e0b";

            default:
                return "#ffffff";

        }

    };

    return (

        <div className="achievement-page">

            {/* ===========================
                HEADER
            ============================ */}

            <div className="achievement-header">

                <button
                    className="back-button"
                    onClick={() => navigate("/")}
                >
                    ← Lobby
                </button>

                <div>

                    <h1>
                        ARGUE ARENA
                    </h1>

                    <h2>
                        ACHIEVEMENTS
                    </h2>

                </div>

            </div>

            {/* ===========================
                OVERALL PROGRESS
            ============================ */}

            <div className="overall-progress">

                <div className="progress-left">

                    <h3>
                        Overall Progress
                    </h3>

                    <h4>

                        {unlockedCount}

                        {" / "}

                        {ACHIEVEMENTS.length}

                        {" Completed"}

                    </h4>

                </div>

                <div className="progress-right">

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width: `${progress}%`
                            }}
                        />

                    </div>

                    <span>

                        {Math.round(progress)}%

                    </span>

                </div>

            </div>

            {/* ===========================
                STATS
            ============================ */}

            <div className="stats-grid">

                <div className="stat-card">

                    <h4>Achievements</h4>

                    <span>

                        {unlockedCount}

                    </span>

                </div>

                <div className="stat-card">

                    <h4>Total</h4>

                    <span>

                        {ACHIEVEMENTS.length}

                    </span>

                </div>

                <div className="stat-card">

                    <h4>Completion</h4>

                    <span>

                        {Math.round(progress)}%

                    </span>

                </div>

                <div className="stat-card">

                    <h4>Rank</h4>

                    <span>

                        {
                            progress === 100
                                ? "Champion"
                                : progress >= 75
                                ? "Master"
                                : progress >= 50
                                ? "Elite"
                                : progress >= 25
                                ? "Debater"
                                : "Beginner"
                        }

                    </span>

                </div>

            </div>

            {/* ===========================
                ACHIEVEMENT CATEGORIES
            ============================ */}

            <div className="category-container">

                {Object.entries(groupedAchievements).map(

                    ([category, list]) => (

                        <div
                            className="category-section"
                            key={category}
                        >

                            <div className="category-title">

                                {category}

                            </div>

                            <div className="achievement-grid">
                                                              {list.map((achievement) => {

                                    const saved =
                                        achievementState[achievement.id];

                                    const unlocked =
                                        saved?.unlocked || false;

                                    return (

                                        <div
                                            key={achievement.id}
                                            className={`achievement-card ${
                                                unlocked
                                                    ? "unlocked"
                                                    : "locked"
                                            }`}
                                        >

                                            {/* Glow */}

                                            <div
                                                className="rarity-strip"
                                                style={{
                                                    background:
                                                        rarityColor(
                                                            achievement.rarity
                                                        ),
                                                }}
                                            />

                                            {/* Icon */}

                                            <div className="achievement-icon">

                                                {unlocked
                                                    ? achievement.icon
                                                    : "🔒"}

                                            </div>

                                            {/* Name */}

                                            <h3>

                                                {unlocked
                                                    ? achievement.title
                                                    : "Hidden Achievement"}

                                            </h3>

                                            {/* Description */}

                                            <p>

                                                {unlocked
                                                    ? achievement.description
                                                    : "Continue playing to reveal this achievement."}

                                            </p>

                                            {/* Bottom */}

                                            <div className="achievement-bottom">

                                                <span
                                                    className="rarity-badge"
                                                    style={{
                                                        borderColor:
                                                            rarityColor(
                                                                achievement.rarity
                                                            ),
                                                        color:
                                                            rarityColor(
                                                                achievement.rarity
                                                            ),
                                                    }}
                                                >

                                                    {achievement.rarity}

                                                </span>

                                                <span className="xp-badge">

                                                    {achievement.xp} XP

                                                </span>

                                            </div>

                                            {unlocked && (

                                                <div className="unlock-date">

                                                    Unlocked

                                                    <br />

                                                    {saved.dateUnlocked}

                                                </div>

                                            )}

                                        </div>

                                    );

                                })}

                            </div>

                        </div>

                    )

                )}

            </div>

            <div className="achievement-footer">

                Keep debating to unlock every achievement and become the

                <span>

                    {" "}
                    Arena Champion

                </span>

                !

            </div>

        </div>

    );

}