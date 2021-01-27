import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import io from 'socket.io-client';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/Dashboard';
import ProtectedRoute from './utils/protectedRoute';
import ChatRoom from './pages/ChatRoom';
import makeToast from './utils/toaster';
import { getToken } from './lib/api';

const App = () => {
  const [socket, setSocket] = React.useState(null);

  const setupSocket = () => {
    const token = getToken();
    if (token && !socket) {
      const newSocket = io('http://localhost:8000', {
        query: {
          token,
        },
      });

      newSocket.on('disconnect', () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast('error', 'Socket Disconnected!');
      });

      newSocket.on('connect', () => {
        makeToast('success', 'Socket Connected!');
      });

      setSocket(newSocket);
    }
  };

  React.useEffect(() => {
    setupSocket();
  });
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={() => <Redirect to="/login" />} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <ProtectedRoute path="/dashboard" component={DashboardPage} />
        <ProtectedRoute
          path="/chatroom/:id"
          socket={socket}
          component={ChatRoom}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
