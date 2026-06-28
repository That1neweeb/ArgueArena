import { sequelize } from "../../../config/db.js";
import { DataTypes } from "sequelize";
import { NPC } from "./npc.model.js";

export const Chapter = sequelize.define("Chapter", {
  chapterNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      min: 1,
      max: 10,
    },
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  topic: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  totalRounds: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
  },

  turnsPerRound: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
  },

  bossRound: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
  },

  backgroundImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  unlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Relationships
NPC.hasMany(Chapter, {
  foreignKey: "npcId",
  onDelete: "CASCADE",
});

Chapter.belongsTo(NPC, {
  foreignKey: "npcId",
});