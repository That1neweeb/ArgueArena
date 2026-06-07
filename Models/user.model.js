import {sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize'

export const User = sequelize.define(
    'User',
    {
        Username : {
            type:DataTypes.STRING,
            allowNull:false
        },
        email : {
            type:DataTypes.STRING,
            allowNull:false
        },
        password : {
            type: DataTypes.STRING,
            allowNull:false
        }
    }
)