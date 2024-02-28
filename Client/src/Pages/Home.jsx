import React from 'react'
import { Typography } from '@mui/material'
import { useOutletContext } from 'react-router-dom'
const Home = () => {
    const {socket} = useOutletContext();
    console.log(socket)
  return (
    <Typography>
    Welcome to my Chat App
  </Typography>
  )
}

export default Home