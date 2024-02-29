import React, { useEffect, useState } from 'react'
import { Link , useNavigate ,useOutletContext, useParams} from 'react-router-dom'
import Cookies from 'js-cookies'
import { Box, Button } from '@mui/material'
import {Card} from '@mui/material'
import { v4 as uuidv4 } from 'uuid';

const Header = (props) => {
    // create random id using uuid gotten from "npm install uuid"
    const navigate = useNavigate();
    const {socket , userId , setUserId} = props;
    
    const [rooms , setRooms] = useState([])
    const [loaded , setLoaded] = useState(false);
// fetch rooms
useEffect(()=>{
    async function fetchRooms(){
        const res = await fetch('http://localhost:8000/api/rooms')
        const { rooms } = await res.json()
        console.log( rooms )
        setRooms(rooms)
        setLoaded(true)
    }

    fetchRooms();
} ,[])
    

    useEffect(()=>{
        console.log(socket)
        if (!socket) return ;
        // to emit a broadcast from server to the other users 
        socket.on('new-room-created' , ({ room }) => {
            // add to rooms
            console.log(room.roomId)
            setRooms([...rooms , room] )
        })

        socket.on('room-removed-backend' , ({roomId}) =>{
            const removeFromDom = () => {
                setRooms(rooms.filter((room) => room.roomId !== roomId))
            }
            removeFromDom();
        })
    },[])

    

    const login = () => {
        // create random user id 
        const userId = uuidv4();
        setUserId(userId)
        // create a cookie 
        Cookies.setItem('userId', userId);
        navigate("/");
    }

    const logout = () => {
        setUserId(null);
        Cookies.removeItem('userId');
        navigate("/");
    }

    const createRoom = () =>{
        const roomId = uuidv4();
        navigate(`/room/${roomId}`)
        socket.emit("new-room-created" , { roomId , userId })
        // setRooms([...rooms , roomId])

       
    }
  return (
    <>
    <Card sx={{marginTop: "2rem",backgroundColor:"pink" }}>
        <Box sx={{display:"flex" , justifyContent : "space-between"}}>
        <Link style={{textDecoration : "none" }} to="/">
        <Button variant ="text" sx={{color:"white" , textDecoration : "none" }}>Home</Button>
        </Link>
        
        {    loaded && userId && rooms.map((room) => {
                return(
                 <Link key = {room.roomId} style={{textDecoration : "none" }} to={`/room/${room.roomId}`}>
                <Button variant ="text" 
                sx={{color:"white" , textDecoration : "none" }}>
                    {room.name}
                </Button>
                </Link> 
                )
            })
        }

        
        {
            userId && (
                <>
                <Button variant ="text" sx={{color:"white"  }} onClick={createRoom}>New room</Button>
                <Button variant ="text" sx={{color:"white"  }} onClick={logout}>Logout</Button>
                </>
            )
        }
        {        !userId &&(        
                <Button variant ="text" sx={{color:"white"  }} onClick={login}>Login</Button>
                    )
        }        

        </Box>
        
    </Card>
    </>
  )
}

export default Header