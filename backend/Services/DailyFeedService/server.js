import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {addMessage} from './dailyFeed.Message.Service.js'
import { Server } from 'socket.io';
import forumRoutes from './routes/forumRoutes.js';
import { startTopicRotation, ensureTodaysTopic } from './topicsConfig/dailyTopicSelector.js';

const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// server cors
app.use(cors({
  origin: "http://localhost:5173",
   methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());
app.use('/api/forums',forumRoutes);

const server = app.listen(PORT,() => {console.log(`server on Port ${PORT}`)});
// socket  cors
const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods: ["GET", "POST"],
        credentials: true,
    }
});
// set the topic
startTopicRotation(io);
await ensureTodaysTopic(io);//make sure there is a topic


io.on('connection', onConnected);
let socketsConnected = new Set();   

function onConnected(socket){
    // connected client count
    console.log("Client connected", socket.id)
    socketsConnected.add(socket.id)
    io.emit('client-total',socketsConnected.size)

    // fetch messages based on topic once daily
    io.emit('fetch-msgs')


    socket.on('disconnect',()=>{
        console.log("Socket disconnected", socket.id)
        socketsConnected.delete(socket.id)
    })

    socket.on('client-msg', async (data, callback) => {
        try{    
            console.log('Data recived',data)
            await addMessage(data.topic_id, data.user_id, data.username, data.text, data.time);            
            socket.broadcast.emit('server-msg', data);
            callback({success: true, data: data});
        }
        catch(err){
            callback({success:false, error: err.message});
        }
    })


}





