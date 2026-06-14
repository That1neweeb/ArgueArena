import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// const http = require('http');

import { Server } from 'socket.io';
import forumRoutes from './routes/forumRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const server = app.listen(PORT,() => {console.log(`server on Port ${PORT}`)});
const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods: ["GET", "POST"],
        credentials: true,
    }
});

let socketsConnected = new Set();

app.use(express.static(path.join(__dirname, '..','client')));

app.use('/forums',forumRoutes);

io.on('connection', onConnected);

function onConnected(socket){
    console.log("Client connected", socket.id)
    socketsConnected.add(socket.id)

    io.emit('client-total',socketsConnected.size)

    socket.on('disconnect',()=>{
        console.log("Socket disconnected", socket.id)
        socketsConnected.delete(socket.id)
    })

    socket.on('client-msg', (data) => {
        console.log("message received from", socket.id, data)
        io.emit('server-msg', data)
    })


}





