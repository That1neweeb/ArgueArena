import { useEffect, useRef, useState } from 'react';
import './DailyFeed.css';
import {socket } from './client.js';
import { data } from 'react-router-dom';
import { useAuth } from '../../context/authContext.jsx';

const initialMessages = [
  {
    id: 1,
    text: 'Free transport would reduce traffic congestion significantly and help lower-income families access jobs.',
    user: 'CivicVoice_42',
  },
  {
    id: 2,
    text: 'The infrastructure cost has to come from somewhere — likely higher taxes. Not a free lunch.',
    user: 'UrbanPlanner_99',
  },
  {
    id: 3,
    text: 'Cities like Tallinn tried this. Ridership went up but funding became unsustainable long term.',
    user: 'PolicyWatcher',
  },
];

const topicText = 'Should public transport be free for all citizens?';

export default function App() {
  console.log("Daily feed rendered");
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState('');
  const feedRef = useRef(null);
  const {user} = useAuth();
  const [topic,setTopic] = useState(null);

  useEffect(() => {

    socket.on('client-total',(size) => {
      console.log(size)
    });

    socket.on('server-msg',(message) => {
      setMessages((prevMessages)=>[
        ...prevMessages,message,
      ]);
    })

    setTopic(1);
// Call api here for getting topic ----------  

    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }

    return () => {
      socket.off('client-total')
      socket.off('server-msg')
    }
  }, []);



  const postMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
        id: user.id,
        text: message.trim(),
        topic_id: topic_id,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    socket.emit('client-msg',newMessage, (response) => {
      if(!response.success){
        console.error(response.error);
      }
    });

    setMessages((prevMessages) => [
      ...prevMessages,newMessage,
    ]);
    setMessage('');

  };

  const handleEnter = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      postMessage();
    }
  };

  return (
    <div className="arena-wrap">
      <div className="arena-header">
        <div className="label">Today's Topic</div>
        <div className="topic" id="topic-text">{topicText}</div>
      </div>

      <div className="arena-feed" id="feed" ref={feedRef}>
        {messages.map((msg) => (
          <div className="msg-card" key={msg.id}>
            <div className="msg-text">{msg.text}</div>
            <div className={`msg-user${msg.user === 'You' ? ' you' : ''}`}>{msg.user}</div>
            {msg.time && <div className="date">{msg.time}</div>}
          </div>
        ))}
      </div>

      <div className="arena-footer">
        <input
          className="arena-input"
          id="msg-input"
          placeholder="Type your thoughts..."
          maxLength={280}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleEnter}
        />
        <button className="post-btn" type="button" onClick={postMessage}>
          Post
        </button>
      </div>
    </div>
  );
}
