import { useEffect, useRef, useState } from 'react';
import './DailyFeed.css';
import {socket } from './client.js';
import { data, Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext.jsx';
import { getMessages, getTopic } from '../../serviceLayer/dailyFeedService.js';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const feedRef = useRef(null);
  const {user} = useAuth();
  const [topic  ,setTopic] = useState('');
  const [userCount,setCount] = useState(null);

  useEffect(() => {
// socket functions 
    socket.on('client-total',(size) => {
      setCount(size);
    });

    socket.on('server-msg',(serverPayload) => {
      // Backend broadcasts the same payload it receives from client.
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: serverPayload.id ?? serverPayload.userId ?? crypto.randomUUID?.() ?? Date.now(),
          text: serverPayload.text,
          user: serverPayload.userName ?? 'You',
          time: serverPayload.time,
        },
      ]);
    })

    // ------------
    async function fetchForum() {
      try{
        const data = await getTopic(); 
        console.log(data.topic.id);
        setTopic(data.topic);
        fetchMessages(data.topic.id);
      }
      catch(err){
          console.log(err.message);
      }
    }
    
    if (feedRef.current) {  
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }

    // fetch the funcs once 
    fetchForum();

    return () => {
      socket.off('client-total')
      socket.off('server-msg')
    }
  }, []);

async function fetchMessages(topicId) {
      try{
        const data = await getMessages(topicId);
        setMessages(Array.isArray(data.messages) ? data.messages : []);
      }
      catch(err){
        console.log(err.message);
      }
      
    }

  const postMessage = () => {
    if (!message.trim()) return;
    console.log(user.username)
    const newMessage = {
        user_id: user.id,
        username: user.username,
        text: message.trim(),
        topic_id: topic.id,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    socket.emit('client-msg',newMessage, (response) => {
      if(!response.success){
        console.error(response.error);
        return
        // add toast to notify user message not sent
      }
        setMessages((prevMessages) => [
        ...prevMessages,newMessage,
      ]);
      setMessage('');
    });

    

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
          <div className="topic" id="topic-text">{topic.title}</div>
        <Link to={'/lobby'}><button >Back</button></Link>
      </div>
      

      <div className="arena-feed" id="feed" ref={feedRef}>
        {messages.length === 0 ? (
          <div className="no-messages">No messages yet</div>
        ) : (
          messages.map((msg) => {
            const senderName = msg.username;
            const isCurrentUser = senderName === user.username ;
            const sentAt = msg.sent_at || msg.time;

            return (
              <div className="msg-card" key={msg.id}>
                <div className="msg-text">{msg.text}</div>
                <div className={`msg-user${isCurrentUser ? ' you' : ''}`}>{isCurrentUser ? 'You' : senderName}</div>
                {sentAt && <div className="date">{sentAt}</div>}
              </div>
            );
          })
        )}
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
