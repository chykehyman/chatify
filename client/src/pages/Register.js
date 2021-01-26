import { useEffect, useState } from 'react';
import { APIRequest } from '../lib/api';
import makeToast from '../utils/toaster';
import verifyToken from '../utils/verifyToken';

const Register = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (verifyToken()) history.push('/dashboard');
  }, [history]);

  const registerUser = () => {
    APIRequest.postWithoutToken('/user/register', { name, email, password })
      .then((response) => {
        makeToast('success', response.data.message);
        history.push('/login');
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
      <div className="cardHeader">Registration</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="off"
            placeholder="John Doe"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
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
      <button onClick={registerUser}>Register</button>
    </div>
  );
};

export default Register;
