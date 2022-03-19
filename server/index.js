const express = require('express');
const app = express();
const http= require('http');
const cors = require('cors');
const {Server} = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io=  new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
})

io.on("connection", (socket)=>{
    console.log(socket.id , "id socket");

    socket.on("join_room",(data)=>{
        // socket.join(data);
        socket.join(data.room);
        console.log("User "+ data.username +" with roomID :"+ data.room);
        console.log(data);
        socket.to(data.room).emit("count_user", data.username);
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
      });

    socket.on("disconnect",()=>{
        console.log("User Disconnect", socket.id)
    })
});


server.listen(3001, ()=>{
    console.log("Server Running");
})