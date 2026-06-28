import { sequelize } from "../../../config/db.js";
import { DataTypes } from "sequelize";
import { User } from "../../../Models/user.model.js";

export const PlayerProfile = sequelize.define("PlayerProfile", {
  xp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  coins: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  stars: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  unlockedChapters: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
    defaultValue: [1],
  },
  unlockedBadges: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: [],
  },
  settings: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {
      sound: true,
      music: true,
      language: "en",
    },
  },
  lastAutosaveAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

User.hasOne(PlayerProfile, {
  foreignKey: "playerId",
  onDelete: "CASCADE",
});

PlayerProfile.belongsTo(User, {
  foreignKey: "playerId",
});
