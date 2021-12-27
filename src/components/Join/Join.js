import React, { useState } from "react";
import { Link } from 'react-router-dom';
import classes from "./Join.module.css"
const Join = () => {
     const [name, setName] = useState("")
     const [room, setRoom] = useState("")
     return (
          <div className={classes.joinOuterContainer}>
               <div className={classes.joinInnerContainer}>
                    <h1 className={classes.heading}>Join Now</h1>
               <div>
                    <input
                         placeholder="Username"
                              className={classes.joinInput}
                              type="text"
                         value={name}
                         onChange={(event)=>{setName(event.target.value)}}
                         />
               </div>
               <div>
                    <input placeholder="Room"
                              className={classes.joinInput}
                              type="text"
                         value={room}
                         onChange={(event)=>{setRoom(event.target.value)}}
                         />
               </div>
               <Link to={`/chat?name=${name}&room=${room}`}
                    onClick= {event => (!name || !room) ? event.preventDefault() : null}
               >
                    <button className={classes.button} type="submit">Sign In</button>
               </Link>
               </div>
          </div>
    )
}
export default Join