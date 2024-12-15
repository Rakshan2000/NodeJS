const { Socket } = require('dgram');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();

const server = http.createServer(app);

//initiate socket.io and attach this to the http server
const io = socketIO(server);

app.use(express.static('public'));

const users = new Set();

io.on("connection",(Socket)=>{
    console.log('A user is now connected');

    
//handle users when they will join the chat
Socket.on('join', (userName)=>{
    users.add(userName);
    Socket.userName = userName;
    //broadcast to all clients/users that a new user has joined
    io.emit('userJoined',userName);

    //send the updated user list to all clients
    io.emit('userList',Array.from(users));
})

//handle incomming chat message

Socket.on('chatMessage',(message)=>{
    //boardcast the recived message to all connected cliets
    io.emit('chatMessage',message);
});

//handle user disconnetion
Socket.on("disconnect",()=>{
    console.log(`An User is disconnected ${Socket.userName}`);

    users.forEach(user => {
        if(user === Socket.userName){
            users.delete(user);

            io.emit('userLeft',user);
            io.emit('userList',Array.from(users));
        }
    })
})

});

const PORT = 3000;

server.listen(PORT,()=>{
    console.log(`Server is now running on http://localhost:${PORT}`);
    
})


