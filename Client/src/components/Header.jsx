import React, { useEffect, useState } from 'react'
import { Link , useNavigate ,useOutletContext} from 'react-router-dom'
import { Box, Button } from '@mui/material'
import {Card} from '@mui/material'
import { v4 as uuidv4 } from 'uuid';

const Header = (props) => {
    // create random id using uuid gotten from "npm install uuid"
    const navigate = useNavigate();
    const {socket} = props;
    
    const [rooms , setRooms] = useState([])

    const createRoom = () =>{
        const roomId = uuidv4();
        navigate(`/room/${roomId}`)
        socket.emit("new-room-created" , { roomId })
        setRooms([...rooms ,roomId])
    }

    useEffect(()=>{
        console.log(socket)
        if (!socket) return ;
        // to emit a broadcast from server to the other users 
        socket.on('new-room-created' , ({ roomId }) => {
            // add to rooms
            console.log(roomId)
            setRooms([ ...rooms , roomId])
            

        })
    },[socket])
  return (
    <>
    <Card sx={{marginTop: "2rem",backgroundColor:"pink" ,  }}>
        <Box sx={{display:"flex" , justifyContent : "space-between"}}>
        <Link style={{textDecoration : "none" }} to="/">
        <Button variant ="text" sx={{color:"white" , textDecoration : "none" }}>Home</Button>
        </Link>
        
        {
            rooms.map((room , index) => {
                return(
                 <Link style={{textDecoration : "none" }} to={`/room/${room}`}>
                <Button variant ="text" 
                sx={{color:"white" , textDecoration : "none" }}>
                    {room}
                </Button>
                </Link> 
                )
            })
        }

        
        <Button variant ="text" sx={{color:"white"  }} onClick={createRoom}>New room</Button>
        

        </Box>
        
    </Card>
    </>
  )
}

export default Header