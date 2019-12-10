const express = require('express')
const app = express()
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const ent = require("ent");
// let SessionSockets = require('session.socket.io'),
// sessionSockets = new SessionSockets(io, sessionStore, cookieParser, key);


const port = 3000;

io.on('connection', socket =>{

    // socket.broadcast.emit('message', user + ' viens de rejoindre le groupe')
    // sessionSockets.on('connection', function (socket, session){
    
        socket.on('user', user =>{
            user = ent.encode(user)
            socket.user = user
            console.log(socket.user)
            socket.broadcast.emit('user', {user: socket.user})
            // socket.user = user
        
        })
    //     session.save();
    // })
    socket.on('message', msg =>{
        // io.emit('message', msg)
        msg = ent.encode(msg);
        socket.emit('message', msg)
        socket.broadcast.emit('message',msg)
        console.log(msg)
    })
    
})

server.listen(port, () =>{
    console.log('run server run')
})