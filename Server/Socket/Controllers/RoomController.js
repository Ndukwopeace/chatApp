export default  class roomController{
    socket;
    constructor(socket){
        this.socket = socket;
    }
    joinRoom = ({roomId}) =>{
        this.socket.join(roomId)
    }
    newRoomCreated = ({roomId}) =>{
        
        this.socket.broadcast.emit("new-room-created", {roomId} )
        
    }
} 