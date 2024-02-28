export default class sendMessageController {
    socket;
    constructor(socket){
        this.socket = socket;
    }

    sendMessage = ({message , roomId}) =>{
        // if we have a room id emit to the room id otherwise emit everywhere 
        let skt = this.socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        console.log("message sent" , {message})
        // send message to client 
        skt.emit('message-from-server' , {message})
    }
}