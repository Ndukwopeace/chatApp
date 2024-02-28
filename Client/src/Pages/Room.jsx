import React, { useEffect } from 'react'
import { useParams,useOutletContext } from 'react-router-dom'
import { io } from 'socket.io-client';
import ChatWindow from '../components/ChatWindow';
import { Typography } from '@mui/material';


const Room = () => {
    const {socket} = useOutletContext();
    const params = useParams();

    useEffect(()=>{
        // if there is no socket do nothing 
        if(!socket) return ;
        // emit an event to the backend asking to join room 
        socket.emit("join-room" , { roomId: params.roomId}) 
        console.log("room id :" , params.roomId)
    },[socket])
  return (
    <>
        <ChatWindow/>
    </>
  )
}

export default Room