import mongoose from "mongoose";

await mongoose.connect("mongodb://127.0.0.1:27017/chatrooms", {
    useNewUrlParser : true ,
    useUnifiedTopology : true 
   
}).then(() => console.log("connection to the database established "))
.catch((err) => console.log("There was an error " , err))