import { useState, useEffect } from 'react'
import ChatWindow from './components/ChatWindow'
import { Container, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { io } from 'socket.io-client'
import Cookies from 'js-cookies';

function App() {
  const [socket, setSocket] = useState(null)
  // const [isLoggedIn , setIsLoggedIn] = useState(false)
  const [userId , setUserId] = useState("")
  useEffect(() => {
    // initialize this io with localHost 8000
    setSocket(() => io('http://localhost:8000'));
    const _userId = Cookies.getItem('userId');
    if (_userId) setUserId(_userId)
  }, [])
  
  return (
    
    <>
    <Container>
      <Header socket = {socket} userId = {userId} setUserId = {setUserId}/>
    <Outlet context = {{socket , userId}}/>
    </Container>
    </>
  )
}

export default App
