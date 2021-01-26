import { useEffect, useState } from 'react';
import { APIRequest } from '../lib/api';
import makeToast from '../utils/toaster';
import verifyToken from '../utils/verifyToken';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (verifyToken()) history.push('/dashboard');
  }, [history]);

  const loginUser = () => {
    APIRequest.postWithoutToken('/user/login', { email, password })
      .then((response) => {
        makeToast('success', response.data.message);
        localStorage.setItem('chatifyToken', response.data.token);
        history.push('/dashboard');
      })
      .catch((error) => {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message
        )
          makeToast('error', error.response.data.message);
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            placeholder="abc@example.com"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button onClick={loginUser}>Login</button>
      </div>
    </div>
  );
};

export default Login;
