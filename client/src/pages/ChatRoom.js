import { useRef, useState } from 'react';
import '../styles/chatRoom.css';

const ChatRoom = ({ match, socket }) => {
  const chatroomId = match.params.id;
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState('');
  const messageRef = useRef();

  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom Name</div>
        <div className="chatroomContent">
          {messages.map((message, i) => (
            <div key={i} className="message">
              <div
                className={
                  userId === message.userId ? 'displayRight' : 'displayLeft'
                }
              >
                <span
                  className={
                    userId === message.userId ? 'ownMessage' : 'otherMessage'
                  }
                >
                  {message.name}:
                </span>
                <p>{message.message}</p>
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
            <button className="join">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
