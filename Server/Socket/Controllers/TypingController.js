
export default class TypingController{
    socket ;
    constructor(socket) {
        this.socket = socket;
    }
    typingStarted = ({roomId}) => {
        // if we have a room id emit to the room id otherwise emit everywhere 
        let skt = this.socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
    
        skt.emit("typing-started-from-server" )
    }
    
    typingStopped = ({roomId}) => {
        // if we have a room id emit to the room id otherwise emit everywhere 
        let skt = this.socket.broadcast;
        console.log(roomId)
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("typing-stopped-from-server")
    }
}


