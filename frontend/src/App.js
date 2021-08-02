import Pusher from 'pusher-js';
import { useEffect,useState } from 'react';
import axios from './axios.js';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import './App.css';

function App() {

  const [messages,setMessage]=useState([]);

  // fetching all messages from the backend

  useEffect(()=>{
    axios.get('/messages/sync')
    .then(res=>{
        setMessage(res.data);
    });
  },[messages]);
  // using pusher to listen for the new messages
  useEffect(()=>{
    var pusher = new Pusher('5eb76e1f25ce4b5765ee', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
        setMessage(...messages,newMessage);
    });
    return()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages]);
  return (
    <div className='app'>
      <div className='app__body'>
      <Sidebar/>
      <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
