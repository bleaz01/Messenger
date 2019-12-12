const express = require('express')
const app = express()
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const ent = require("ent");
const md5 = require('MD5')
var uuid = require('uuid/v1')
// let SessionSockets = require('session.socket.io'),
// sessionSockets = new SessionSockets(io, sessionStore, cookieParser, key);


const port = 3000;

//coonection au server socket.io
io.on('connection', (socket) =>{

     
   
        
        socket.on('message', msg =>{
            
            msg = JSON.parse(msg)
            console.log(msg)
            socket.broadcast.emit('message',msg )
            // socket.emit('message',msg)
           
        })

   
    
})

server.listen(port, () =>{
    console.log('run server run')
})