import { useEffect, useRef, useState } from 'react';
import '../styles/chatRoom.css';
import { getToken } from '../lib/api';

const ChatRoom = ({ match, socket }) => {
  const chatroomId = match.params.id;
  const [chatMessages, setChatMessages] = useState([]);
  const [userId, setUserId] = useState('');
  const messageRef = useRef();

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', {
        chatroomId,
      });
    }

    return () => {
      if (socket) {
        socket.emit('leaveRoom', {
          chatroomId,
        });
      }
    };
  });

  useEffect(() => {
    const token = getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.id);
    }
    if (socket) {
      socket.on('newMessage', (message) => {
        const newMessages = [...chatMessages, message];
        setChatMessages(newMessages);
      });
    }
  }, [chatMessages, socket]);

  const sendMessage = () => {
    const message = messageRef.current.value.trim();
    if (socket && message) {
      socket.emit('chatroomMessage', {
        chatroomId,
        message,
      });

      messageRef.current.value = '';
    }
  };

  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom Name</div>
        <div className="chatroomContent">
          {chatMessages.map((chatMessage, i) => (
            <div key={i} className="message">
              <div
                className={
                  userId === chatMessage.userId ? 'displayRight' : 'displayLeft'
                }
              >
                <span
                  className={
                    userId === chatMessage.userId
                      ? 'ownMessage'
                      : 'otherMessage'
                  }
                >
                  {chatMessage.name}:
                </span>
                <span>{chatMessage.message}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="chatroomActions">
          <div>
            <input
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
            />
          </div>
          <div>
            <button className="join" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
