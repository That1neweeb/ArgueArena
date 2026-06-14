import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST || 'localhost';
const dialect = process.env.DB_DIALECT || 'postgres';

export const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

export const connection = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database connection successful');
  } catch (e) {
    console.log('Database connection error', e);
  }
};