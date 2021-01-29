import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import makeToast from '../utils/toaster';
import axios from 'axios';
import { API_URL } from '../constants';
import { getToken } from '../lib/api';

const Dashboard = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('GETTING ROOMS');
    setLoading(true);
    axios
      .get(`${API_URL}/chatrooms`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then(({ data: { payload } }) => {
        setChatrooms(payload);
      })
      .catch((error) => makeToast('error', 'Unable to fetch available rooms'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>dashboard is loading...</div>;

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
          chatrooms.map((chatroom, i) => (
            <div className="chatroom" key={i}>
              <div>{chatroom.name}</div>
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
