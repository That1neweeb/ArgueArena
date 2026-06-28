import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFiles = [
  path.join(__dirname, '../Services/StoryService/.env'),
  path.join(__dirname, '../Services/AuthService/.env'),
  path.join(__dirname, '../.env'),
];

envFiles.forEach((envPath) => {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
});

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = `${process.env.DB_PASSWORD || ""}`;
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432;
const dialect = process.env.DB_DIALECT || 'postgres';

export const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
});

export const connection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Database connection successful');
  } catch (e) {
    console.error('Database connection error', e);
    throw e;
  }
};