import React,{useState} from 'react';
import axios from './axios.js';
import { AttachFile,MoreVert,SearchOutlined } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic'; 
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {Avatar,IconButton} from '@material-ui/core';
import './chat.css';

function Chat({messages}) {
    const [input,setInput]=useState('');
    const sendMessage=async (e)=>{
        e.preventDefault();
         await axios.post('/messages/new',{
            message:input,
            name:'Yash',
            timeStamp:'Just now',
            received:false
        });
    setInput('');
    };

    return (
        <div className ='chat'>
            <section className ='chat__header'>
            <Avatar src='https://i.pinimg.com/474x/5e/14/db/5e14db0ca6dd11a102bc4475e30cc546.jpg'/>
            <div className='chat__headerInfo'>
                <h3>Room Name</h3>
                <p>Last seen at...</p>
            </div>
            <div className='chat__headerRight'>
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
            </section>
            
            <section className ='chat__body'>
                {
                    messages.map((message,index)=>{
                        return(
                            <p className={`chat__message ${message.received && 'chat__receiver'}`} key={index}>
                                <span className='chat__name'>{message.name}</span>
                                {message.message}
                                <span className='chat__timestamp'>
                                    {message.timeStamp}
                                </span>
                            </p>
                           
                        )
                    })
                }

            </section>
        
            <section className ='chat__footer'>
            <IconButton><InsertEmoticonIcon/></IconButton>
                <form>
                    <input 
                    value ={input}
                    onChange ={(e)=>{
                        setInput(e.target.value)
                    }}
                    placeholder ='Type a message'
                    type ="text"/>

                    <button className ='send__message'
                    onClick ={sendMessage}
                    type ='submit'>
                    </button>
                    <IconButton><MicIcon/></IconButton>
                </form>
            </section>
        </div>
    )
}

export default Chat;
