// import { sequelize } from "../../../config/db.js";
// import { DataTypes } from "sequelize";
// import { User } from "../../../Models/user.model.js";

// export const Achievement = sequelize.define("Achievement", {
//   key: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false,
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   rewardXP: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0,
//   },
//   rewardCoins: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0,
//   },
// });

// export const PlayerAchievement = sequelize.define(
//   "PlayerAchievement",
//   {
//     playerId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },

//     achievementId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },

//     earnedAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     indexes: [
//       {
//         unique: true,
//         fields: ["playerId", "achievementId"],
//       },
//     ],
//   }
// );



// models/achievement.model.js
// ================================================================

import { sequelize } from "../../../config/db.js";
import { DataTypes } from "sequelize";

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
  // ── New display fields ──────────────────────────────────────
  icon: {
    type: DataTypes.STRING(10),
    allowNull: true,
    defaultValue: "🏆",
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "General",
  },
  rarity: {
    type: DataTypes.ENUM("Common", "Rare", "Epic", "Legendary"),
    allowNull: false,
    defaultValue: "Common",
  },
  // ── Rewards ─────────────────────────────────────────────────
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
      { unique: true, fields: ["playerId", "achievementId"] },
    ],
  }
);

// Relationship — needed for include queries
Achievement.hasMany(PlayerAchievement, { foreignKey: "achievementId" });
PlayerAchievement.belongsTo(Achievement, { foreignKey: "achievementId" });