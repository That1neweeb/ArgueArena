import { sequelize } from "../../../config/db.js";
import { DataTypes } from "sequelize";
import { User } from "../../../Models/user.model.js";
import { Chapter } from "./chapter.model.js";

export const PlayerProgress = sequelize.define("PlayerProgress", {
  currentRound: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 10,
    },
  },

  currentTurn: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 10,
    },
  },

  chapterScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  chapterCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  completedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

// =========================
// Relationships
// =========================

// One User → Many Progress Records
User.hasMany(PlayerProgress, {
  foreignKey: "playerId",
  onDelete: "CASCADE",
});

PlayerProgress.belongsTo(User, {
  foreignKey: "playerId",
});

// One Chapter → Many Player Progress Records
Chapter.hasMany(PlayerProgress, {
  foreignKey: "chapterId",
  onDelete: "CASCADE",
});

PlayerProgress.belongsTo(Chapter, {
  foreignKey: "chapterId",
});