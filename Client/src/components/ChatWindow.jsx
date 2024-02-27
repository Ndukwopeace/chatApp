import React, {useEffect , useState} from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { io } from 'socket.io-client'
import { Container, Typography, OutlinedInput, InputAdornment, IconButton, InputLabel, FormControl, Card } from '@mui/material'

import SendIcon from '@mui/icons-material/Send';

const ChatWindow = () => {
    const [socket, setSocket] = useState(null)
    const [message, setMessage] = useState('')
  
    const [chat, setChat] = useState([]);
    const [typing , setTyping] = useState(false)
  
    useEffect(() => {
      // initialize this io with localHost 8000
      setSocket(() => io('http://localhost:8000'));
    }, [])
  
    useEffect(() => {
      if (!socket) return;
      socket.on('message-from-server', (data) => {
        console.log('message recieved', data)
        setChat((prev) => [...prev, {message: data.message , recieved : true}])
      })

      socket.on("typing-started-from-server" , ()=>{
        setTyping(true);
      })
      socket.on("typing-stopped-from-server" , ()=>{
        setTyping(false);
      })
    }, [socket])
  const [typingTimeout , setTypingTimeout] = useState(null);
  let timeout;
    const handleInput = (e) =>{
        
        setMessage(e.target.value);
        socket.emit("typing-started")
        // create Debounce effect 
        if(typingTimeout) clearTimeout(typingTimeout)
       setTypingTimeout( timeout = setTimeout(()=>{
            socket.emit("typing-stopped")
            // console.log('typing stopped')
        },1000)
        );
    }
    const handleForm = (e) => {
      e.preventDefault();
      console.log(message)
      socket.emit('send-message', { message });
      setChat((prev) => [...prev, {message , recieved : false}]);
      setMessage("")
    }
  return (

    <>
     <Box sx={{display : "flex" , justifyContent:"center"}}>
        <Card sx={{padding : "1.5rem" , width:"40rem", 
        marginTop: "5rem",
        backgroundColor:"grey"}}>
            
          <Box style={{ marginBottom: '5px' }}>
            {
              chat.map((data, index) => {
                return (

                  <Typography
                    sx={{ textAlign: data.recieved?"left" : "right"}}
                  
                  key={index}>{data.message}</Typography>
                )
              })
            }
          </Box>
          <Box component="form" onSubmit={handleForm}>
            {
                typing? 
                <InputLabel shrink htmlFor= "message-input">
                Typing....
                </InputLabel>
                :
                null
            }
            
              
              <OutlinedInput
                // placeholder="Send message ..."
                sx={{backgroundColor: "white"}}
                placeholder='Send a message ...'
                fullWidth
                id = "message-input"
                size='small'
                value={message}
                onChange={handleInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      edge='edge'
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                }

              />

            


          </Box>
        </Card>

        </Box>
    </>
  )
}

export default ChatWindow