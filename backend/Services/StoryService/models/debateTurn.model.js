import { sequelize } from "../../../config/db.js";
import { DataTypes } from "sequelize";
import { Debate } from "./debate.model.js";

export const DebateTurn = sequelize.define("DebateTurn", {
  turnNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },

  npcDialogue: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Relationships
Debate.hasMany(DebateTurn, {
  foreignKey: "debateId",
  onDelete: "CASCADE",
});

DebateTurn.belongsTo(Debate, {
  foreignKey: "debateId",
});