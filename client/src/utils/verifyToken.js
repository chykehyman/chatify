import jwt from 'jsonwebtoken';
import { SECRETE_KEY } from '../env.config';

const verifyToken = () => {
  const token = window.localStorage.chatifyToken;
  let verified;
  if (token) {
    jwt.verify(token, SECRETE_KEY, (error) => {
      if (error) {
        verified = 0;
      } else {
        verified = 1;
      }
    });
  } else {
    verified = 0;
  }
  return verified;
};

export default verifyToken;
