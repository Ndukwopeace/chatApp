import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
    name : String ,
    roomId : String,
    userId : {
        type : String ,
        required : [true , "A user shouldbe logged in to create a room , kappish?"]
    }
})

export default mongoose.model('room' , roomSchema) 