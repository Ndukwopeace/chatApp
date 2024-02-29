import express from 'express'
import http from 'http'
import { Server } from "socket.io"
import sockets from './Socket/socket.js';
import './config/mongoose.config.js';
import router from './routes/rooms.routes.js';
import cors from 'cors'


const app = express();

// make sure to use Cors before the route 
app.use(cors())
app.use("/", router)
const port = 8000;
// create http server and use express instance
const httpServer = http.createServer(app);
// create new instance of socket server with our http server as argument 
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true
    }
});

io.on('connection', sockets)

httpServer.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

