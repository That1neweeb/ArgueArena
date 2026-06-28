import { sequelize } from "../../../config/db.js";
import { DataTypes } from "sequelize";

export const NPC = sequelize.define("NPC", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  difficulty: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "medium",
  },

  background: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  idleImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  neutralImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  panicImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  smirkImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});