import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connection } from '../../config/db.js'
import authRouter from './auth.routes.js'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());
const PORT = 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3001"],
  credentials: true
}));

connection();

dotenv.config(path.join(__dirname, '.env') );
app.use('/api/auth',authRouter);

app.listen(PORT , () =>{
console.log("Auth service is live on port:",{PORT});
})