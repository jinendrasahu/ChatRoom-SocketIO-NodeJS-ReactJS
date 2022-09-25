import React from 'react';
import "./Messages.css";
import user from "./user.png"; 
function Messages(props) {
    let {name,message,align} = props
    return (
    <div className='block'>
        <div className='Message' style={{"float":align}}>
            <div>
            <img alt='Iii' src={user} className='avatar'></img>
            </div>
            <div>
            <span className='name'>{name}</span><br></br>
            <span>{message}</span>
            </div>
        </div>
    </div>
    );
}

export default Messages;