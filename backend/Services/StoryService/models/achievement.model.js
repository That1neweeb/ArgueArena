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
    defaultValue: 0,
  },
  rewardCoins: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export const PlayerAchievement = sequelize.define(
  "PlayerAchievement",
  {
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    achievementId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    earnedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["playerId", "achievementId"],
      },
    ],
  }
);
