
import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server } from 'socket.io';
import dotenv from "dotenv";
dotenv.config();

import {connectToDb} from "./database/mongodb.js"
import {MessageModel} from "./database/message.schema.js"

const app = express();
app.use(express.static('public'))

const server = http.createServer(app)

const io = new Server(server)

const users = {}

io.on('connection', (socket)=>{
    console.log("Connection made: ", socket.id);
    socket.on('username', async (data)=>{

        try{
            users[socket.id] = {name: data.name, avatar: data.avatar};
            console.log(`${users[socket.id].name} Connected successfully.`);
    
            socket.emit('notify', {text:`Welcome, ${users[socket.id].name}`})
            socket.broadcast.emit('notify',{text: `${users[socket.id].name} has joined the room.`})

            const allMsg = await MessageModel.find().lean();
    
            io.emit("previousMessages", allMsg)
            io.emit('allUsers', users)
        }catch(err){
            console.log("Error while getting old msgs: ", err);
        }

    })

    socket.on('message', async (message)=>{
        // users[socket.id].text = message;
        try{
            const newMsg =  await MessageModel.create({
                username:users[socket.id].name,
                text:message,
                avatar:users[socket.id].avatar
                })
            io.emit('messageToAll', newMsg.toJSON())
        } catch(err){
            console.log("Error while sending msg: ", err);
        }
    })

    socket.on('startTyping', ()=>{
        socket.broadcast.emit('startedTyping', users[socket.id].name)
    })

    socket.on('stopTyping', ()=>{
        socket.broadcast.emit('stoppedTyping')
    })

    socket.on("disconnect", ()=>{
        console.log("Conncetion disconnected.");
        socket.broadcast.emit("leftuser", users[socket.id])
        delete users[socket.id];
        io.emit('allUsers', users)
    })
})

server.listen(3000, ()=>{
    console.log("Server is running on 3000");
    connectToDb();
})