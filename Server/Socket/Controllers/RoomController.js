import roomsModel from "../../models/rooms.model.js";


export default  class roomController{
    socket;
    constructor(socket){
        this.socket = socket;
    }
    joinRoom = ({roomId}) =>{
        this.socket.join(roomId)
    }
    newRoomCreated = ({roomId , userId}) =>{
        const room = new roomsModel({
            name : 'Test',
            roomId: roomId,
            userId
        })
        room.save();
        this.socket.emit("new-room-created", {room} )
        
    }

    roomRemoved = async ({roomId}) => {
        // Emit to everybody including the user deleting 
        const res = await roomsModel.deleteOne({roomId : roomId});
        
        this.socket.emit("room-removed-backend" , {roomId} );
    }
} 