import express from 'express'

import http from 'http'

import { Server } from "socket.io"

const app = express();

const port = 8000;

// create http server and use express instance
const httpServer = http.createServer(app);

// create new instance of socket server with our http server as argument 
const io = new Server(httpServer , {
    cors : {
        origin : ['http://localhost:5173'],
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true
    }
});

// this is a node.js module hust like http , to create __dirname 
import path from 'path'

import { fileURLToPath } from 'url'

// fileUTLToPath will take the absolute path of the index.html and set it to the filename 

const __filename = fileURLToPath(import.meta.url);

// get the directory name from __file name 

const __dirname = path.dirname(__filename)

// ======================== End of creating dir name =================

app.get("/", (req, res) => {
    // res.json({data : "hello from the world"});
    res.sendFile(__dirname + "/index.html")

})




io.on('connection', (socket) => {
    // listen for message from client
    socket.on('send-message' , (data)=>{
        console.log("message sent" , data)
        // send message to client 
        socket.broadcast.emit('message-from-server' , data)
    })
    socket.on("typing-started" , () => {
        socket.broadcast.emit("typing-started-from-server")
    })
    socket.on("typing-stopped" , () => {
        socket.broadcast.emit("typing-stopped-from-server")
    })

    // to disconnect 
    socket.on('disconnect', (socket) => {
        console.log("user Left.")
        
    })
})



httpServer.listen(port, () => {console.log(`Server is running at http://localhost:${port}`)
})

