import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: 'Authentication failed. Token is invalid or expired',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else
    res.status(403).json({
      message: 'Access denied. Token is required',
    });
};
