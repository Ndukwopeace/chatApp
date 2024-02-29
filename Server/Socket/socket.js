import TypingController from "./Controllers/TypingController.js";
import roomController from "./Controllers/RoomController.js";
import sendMessageController from "./Controllers/SendMessageController.js";
const sockets = (socket) =>{
    const typingController = new TypingController(socket)
    const RoomController = new roomController(socket)
    const SendMessageController = new sendMessageController(socket)

    socket.on('send-message' , SendMessageController.sendMessage)
    socket.on("typing-started" , typingController.typingStarted)
    
    socket.on("typing-stopped" , typingController.typingStopped )
    
    socket.on("join-room" , RoomController.joinRoom)
    socket.on("new-room-created" , RoomController.newRoomCreated)
    socket.on("room-removed" , RoomController.roomRemoved)


    // to disconnect 
    socket.on('disconnect', (socket) => {
        console.log("user Left.")
        
    })
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
}

export default sockets;
