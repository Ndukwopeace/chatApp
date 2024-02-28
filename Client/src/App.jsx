import { useState, useEffect } from 'react'
import ChatWindow from './components/ChatWindow'
import { Container, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { io } from 'socket.io-client'

function App() {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    // initialize this io with localHost 8000
    setSocket(() => io('http://localhost:8000'));
  }, [])
  
  return (
    
    <>
    <Container>
      <Header socket = {socket}/>
    <Outlet context = {{socket}}/>
    </Container>
    </>
  )
}

export default App
