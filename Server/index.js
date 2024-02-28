import express from 'express'

import http from 'http'

import { Server } from "socket.io"
import sockets from './Socket/socket.js'; 

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
// import path from 'path'

// import { fileURLToPath } from 'url'

// // fileUTLToPath will take the absolute path of the index.html and set it to the filename 

// const __filename = fileURLToPath(import.meta.url);

// // get the directory name from __file name 

// const __dirname = path.dirname(__filename)

// // ======================== End of creating dir name =================

// app.get("/", (req, res) => {
//     // res.json({data : "hello from the world"});
//     res.sendFile(__dirname + "/index.html")

// })




io.on('connection', sockets)



httpServer.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

