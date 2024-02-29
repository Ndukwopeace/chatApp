import { Router } from "express";
import roomsModel from "../models/rooms.model.js";

const router = new Router();

router.get("/api/rooms" , async (req,res) => {
        console.log("hello there")
        const rooms = await roomsModel.find()
        res.json({rooms})
        console.log(rooms)
})

// router.delete("/api/rooms/:roomId" , async (req , res) => { 
//      await roomsModel.deleteOne({roomId : req.params.roomId})
//     .then((deleteConfirmation) => res.json(deleteConfirmation))
//     .catch(err => console.log(err))
// })

export default router;