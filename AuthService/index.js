import express from 'express';
import {connection } from '../config/db.js'
const app = express();
const PORT = 3001;

connection();
app.listen(PORT , () =>{
console.log("Auth service is live on port:",{PORT});
})