import { sequelize } from "../../../config/db.js";
import { DataTypes } from "sequelize";
import { User } from "../../../Models/user.model.js";

export const Achievement = sequelize.define("Achievement", {
  key: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rewardXP: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  rewardCoins: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

export const PlayerAchievement = sequelize.define("PlayerAchievement", {
  earnedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(PlayerAchievement, {
  foreignKey: "playerId",
  onDelete: "CASCADE",
});

PlayerAchievement.belongsTo(User, {
  foreignKey: "playerId",
});

Achievement.hasMany(PlayerAchievement, {
  foreignKey: "achievementId",
  onDelete: "CASCADE",
});

PlayerAchievement.belongsTo(Achievement, {
  foreignKey: "achievementId",
});
