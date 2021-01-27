import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { APIRequest } from '../lib/api';
import makeToast from '../utils/toaster';

const Dashboard = () => {
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    APIRequest.getWithToken('/chatrooms')
      .then(({ data: { payload } }) => setChatrooms(payload))
      .catch((error) => makeToast('error', 'Unable to fetch available rooms'));
  }, []);

  return (
    <div className="card">
      <div className="cardHeader">Chat Rooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chat Room Name</label>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            placeholder="ChatterBox Nepal"
          />
        </div>
      </div>
      <button>Create Chat Room</button>
      <div className="chatrooms">
        {chatrooms.length === 0 ? (
          <div style={{ textAlign: 'center' }}>No Rooms available yet</div>
        ) : (
          chatrooms.map((chatroom) => (
            <div className="chatroom">
              <div>Happy Newbie</div>
              <Link to={`/chatroom/${chatroom._id}`}>
                <div className="join">Join</div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
