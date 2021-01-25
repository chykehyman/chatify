import sha256 from 'js-sha256';
import jwt from 'jsonwebtoken';

import User from '../models/user';

const { SALT, SECRET_KEY } = process.env;

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

  if (!emailRegex.test(email)) throw 'Email is not supported from your domain.';
  if (password.length < 6) throw 'Password must be at least 6 characters long.';

  const userExists = await User.findOne({ email });

  if (userExists) throw 'User with same email already exits.';

  const user = new User({
    name,
    email,
    password: sha256(password + SALT),
  });

  await user.save();

  res.status(201).json({
    message: `User [${name}] registered successfully!`,
  });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password: sha256(password + SALT),
  });

  if (!user) throw 'Email and Password did not match.';

  res.status(200).json({
    message: 'User logged in successfully!',
    token: jwt.sign({ id: user.id }, SECRET_KEY),
  });
};
