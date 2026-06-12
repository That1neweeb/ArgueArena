import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';   
import {connection } from '../config/db.js'
import authRoutes from './auth.routes.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);



connection();
app.listen(PORT , () =>{
console.log("Auth service is live on port:",{PORT});
})