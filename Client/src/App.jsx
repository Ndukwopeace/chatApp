import { useState, useEffect } from 'react'
import ChatWindow from './components/ChatWindow'
import { Container, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

function App() {

  
  return (
    <>
    <Container>
      <Header/>
    <Outlet/>
    </Container>
    </>
  )
}

export default App
