import { sequelize } from "../../../config/db.js";
import { DataTypes } from "sequelize";
import { DebateTurn } from "./debateTurn.model.js";

export const ArgumentOption = sequelize.define("ArgumentOption", {
  optionNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 3,
    },
  },

  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  quality: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 2,
    },
    // 0 = Poor
    // 1 = Neutral
    // 2 = Good
  },

  npcReply: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  expression: {
    type: DataTypes.ENUM(
      "idle",
      "neutral",
      "panic",
      "smirk"
    ),
    allowNull: false,
    defaultValue: "neutral",
  },
});

// Relationships
DebateTurn.hasMany(ArgumentOption, {
  foreignKey: "turnId",
  onDelete: "CASCADE",
});

ArgumentOption.belongsTo(DebateTurn, {
  foreignKey: "turnId",
});