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

        socket.on('newUser', nickname =>{
            //je recupére le nom des utilisateurs
            socket.nickname = nickname  
            console.log(socket.nickname)
            //ajoute d 'un avatar (md5 sert a coller l'avatar au user)
            // me.avatar = 'https://gravatar.com/avatar/' + md5(me.id) + '?s =50';
            //envoi msg a tous les user (broadcast.emit)
            io.sockets.emit('newUser', socket.nickname)
        })
    
        
        socket.on('message', msg =>{
            
            msg = JSON.parse(msg)
            console.log(msg)
            socket.broadcast.emit('message',msg )
            socket.emit('message',msg)
        })

   
    
})

server.listen(port, () =>{
    console.log('run server run')
})