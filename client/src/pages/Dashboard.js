const Dashboard = () => {
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
        <div className="chatroom">
          <div>Happy Newbie</div>
          <div className="join">Join</div>
        </div>
        <div className="chatroom">
          <div>Happy Newbie</div>
          <div className="join">Join</div>
        </div>
        <div className="chatroom">
          <div>Happy Newbie</div>
          <div className="join">Join</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
