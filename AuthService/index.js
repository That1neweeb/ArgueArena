import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRoutes from './auth.routes.js';
import sequelize from '../config/db.js';  

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);


sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection failed:', err));

app.listen(PORT, () => {
    console.log("Auth service is live on port:", PORT);  
});