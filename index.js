
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import http from "http";
import { Server } from 'socket.io';
import dotenv from "dotenv";
dotenv.config();

import {connectToDb} from "./database/mongodb.js"
import {MessageModel} from "./message.schema.js"

const app = express();
app.use(express.static('public'))

const server = http.createServer(app)

const io = new Server(server)

const imagesArray = [
    "https://img.freepik.com/premium-vector/cute-chibi-superhero-design_1046319-149433.jpg",
    "https://www.shutterstock.com/image-vector/kharkov-ukraine-august-16-2017-600nw-697034857.jpg",
    "https://www.shutterstock.com/image-vector/july-3-2023-vector-illustration-260nw-2326749515.jpg",
    "https://static.vecteezy.com/system/resources/previews/022/026/298/non_2x/cute-captain-america-marvel-free-vector.jpg"
]

let ramdomNum = Math.round(Math.random()*3)

const users = {}

io.on('connection', (socket)=>{
    console.log("Connection made: ", socket.id);
    socket.on('username', (name)=>{

        users[socket.id] = {name, avatar: imagesArray[ramdomNum]};
        console.log(`${users[socket.id].name} Connected successfully.`);

        socket.emit('notify', {text:`Welcome, ${users[socket.id].name}`})
        socket.broadcast.emit('notify',{text: `${users[socket.id].name} has joined the room.`})

        // io.emit('allUsers', users)
        socket.emit('allUsers', users)

    })

    socket.on("disconnect", ()=>{
        console.log("Conncetion disconnected.");
    })
})

server.listen(3000, ()=>{
    console.log("Server is running on 3000");
    connectToDb();
})