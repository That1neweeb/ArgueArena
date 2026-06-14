import sequelize  from '../config/db.js';
import { DataTypes } from 'sequelize'

export const User = sequelize.define(
    'User',
    {
     id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    xp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    rank: {
        type: DataTypes.STRING(50),
        defaultValue: 'Citizen',
    },
    influence: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
    },
    streak: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    verify_token: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    verify_token_expiry: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'players',  
    timestamps: false,     
});

export default User;