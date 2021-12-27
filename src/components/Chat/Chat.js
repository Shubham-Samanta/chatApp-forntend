import React,{useState,useEffect} from 'react';
import io from 'socket.io-client'
import classes from "./Chat.module.css"
import { useLocation } from "react-router-dom";
const socket = io.connect("https://shubham-chatapp.herokuapp.com/")


const Chat = () => {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [Room, setRoom] = useState();
  const[Name, setName] = useState()
  let params = new URLSearchParams(useLocation().search);
  
  useEffect(() => {
    setRoom(params.get('room'))
    setName(params.get('name'))
  })

  useEffect(() => {
    socket.on("your id", (id) => {
      setYourID(id)
    })
  
    socket.on("message", (message) => {
      setMessages([...messages,message] )
    })
  })
  
  
  
  function sendMessage(e) {
    e.preventDefault()
    const messageObject = {
      body: message,
      id: yourID,
      name:Name
    }
    //setMessages([...messages, message])
    console.log(messages)
    setMessage("")
    socket.emit("send message", messageObject)
  }

  function handleChange(e) {
    setMessage(e.target.value)
  }

  return (
    <div className={classes.Page}>
      <div className={classes.Room}>Room name - {Room}</div>
      <div className={classes.Container}>
        
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return (
              <div className={classes.MyRow} key={index}>
              <div className={classes.myMessageContainer}>
                  <div className={classes.Name}>You</div>
                  <div className={classes.MyMessage}>
                    {message.body}
                  </div>
                </div>
              </div>
            )
          }
          else {
            return (
              <div className={classes.PartnerRow} key={index}>
                <div className={classes.partnerMessageContainer}>
                  <div className={classes.Name}>{message.name}</div>
                  <div className={classes.PartnerMessage}>
                    {message.body}
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
      <div className={classes.Footer}></div>
      <form className={classes.Form} onSubmit={sendMessage}>
        <input className={classes.TextArea}value={message} onChange={handleChange} placeholder="Type a message" />
        <button className={classes.Button}>send</button>
      </form>
      
    </div>
  )
}
export default Chat