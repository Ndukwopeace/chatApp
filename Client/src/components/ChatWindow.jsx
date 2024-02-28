import React, {useEffect , useState} from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { io } from 'socket.io-client'
import { Container, Typography, OutlinedInput, InputAdornment, IconButton, InputLabel, FormControl, Card } from '@mui/material'

import SendIcon from '@mui/icons-material/Send';
import { useOutletContext ,useParams} from 'react-router-dom'

const ChatWindow = () => {
  // context gotten from parent Outlet 
  const {socket} = useOutletContext();
  const { roomId } = useParams();
    // message to be sent 
    const [message, setMessage] = useState('')
  // array of chats 
    const [chat, setChat] = useState([]);
    // for typing event 
    const [typing , setTyping] = useState(null)

    // const [loaded , setLoaded] = useState(false)

    // if we have a room id 

  
   
  
    useEffect(() => {
      // if there is no socket do nothing
      if (!socket) return;
      socket.on('message-from-server', (data) => {
        console.log('message recieved', data)
        setChat((prev) => [...prev, {message: data.message , recieved : true}])
      })

      socket.on("typing-started-from-server" , ()=> setTyping(true))
      socket.on("typing-stopped-from-server" , () => setTyping(false))
      
    }, [socket])

  const [typingTimeout , setTypingTimeout] = useState(null);
  const handleInput = (e) =>{
        setMessage(e.target.value);
        socket.emit("typing-started" , { roomId })
        // console.log(roomId)
        // create Debounce effect 
        if(typingTimeout) {clearTimeout(typingTimeout)}

       setTypingTimeout(setTimeout(()=>{
            socket.emit("typing-stopped" , { roomId })
            // console.log(roomId)
            // console.log('typing stopped')
        },1000)
        );
    }
    const handleForm = (e) => {
      e.preventDefault();
      console.log(message)
      socket.emit('send-message', { message , roomId });
      setChat((prev) => [...prev, {message , recieved : false}]);
      setMessage("")
    }
  return (

    <>
     <Box sx={{display : "flex" , justifyContent:"center"}}>
        <Card sx={{padding : "1rem" , width:"40rem", 
        marginTop: "5rem",
        backgroundColor:"grey"}}>
          {
            roomId && <Typography sx={{textAlign:"center"}}>Room:{roomId}</Typography>
          }
            
          <Box style={{ marginBottom: '5rem' }}>
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