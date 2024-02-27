import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from '@mui/material'
import {Card} from '@mui/material'
const Header = () => {
  return (
    <>
    <Card sx={{marginTop: "2rem",backgroundColor:"pink" ,  }}>
        <Link to="/">
        <Button variant ="text" sx={{color:"white" , textDecoration : "none" }}>Home</Button>
        </Link>

        <Link to="/chats">
        <Button variant ="text" sx={{color:"white" , textDecoration : "none" }}>Chats</Button>
        </Link>

        <Link to="/room/:roomId">
        <Button variant ="text" sx={{color:"white" , textDecoration : "none" }}>Room 1</Button>
        </Link>
    </Card>
    </>
  )
}

export default Header