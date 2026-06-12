import express from 'express';
import dotenv from 'dotenv';
import {connection } from '../../config/db.js'
import authRouter from './auth.routes.js'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connection();

dotenv.config(path.join(__dirname, '.env') );
app.use('/auth',authRouter);

app.listen(PORT , () =>{
console.log("Auth service is live on port:",{PORT});
})