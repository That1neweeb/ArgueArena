import { sequelize } from "../../../config/db.js";
import { DataTypes } from "sequelize";
import { Chapter } from "../models/chapter.model.js";

export const Debate = sequelize.define("Debate", {
  roundNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },

  numberOfTurns: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
    validate: {
      min: 1,
    },
  },

  passingScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 14,
  },

  bossRound: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Relationships
Chapter.hasMany(Debate, {
  foreignKey: "chapterId",
  onDelete: "CASCADE",
});

Debate.belongsTo(Chapter, {
  foreignKey: "chapterId",
});