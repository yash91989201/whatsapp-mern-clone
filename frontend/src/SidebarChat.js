import React from 'react';
import { Avatar } from '@material-ui/core';
import './sidebarchat.css';

function SidebarChat() {
    return (
        <div className='sidebarChat'>
            <Avatar src='https://i.pinimg.com/474x/5e/14/db/5e14db0ca6dd11a102bc4475e30cc546.jpg'/>
            <div className='sidebarChat__info'>
                <h2>Room Name</h2>
                <p>this is the last message</p>
            </div>
        </div>
    )
}

export default SidebarChat
