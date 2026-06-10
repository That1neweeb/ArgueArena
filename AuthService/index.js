import express from 'express';
import dotenv from 'dotenv';
import {connection } from '../config/db.js'
import authRouter from './auth.routes.js'
const app = express();
const PORT = 3001;

connection();

dotenv.config({ path: path.join(__dirname, '.env') });
app.use('/auth',authRouter);

app.listen(PORT , () =>{
console.log("Auth service is live on port:",{PORT});
})