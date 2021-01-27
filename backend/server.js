import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import 'dotenv/config';
import 'colors';

import {
  notFound,
  mongooseErrors,
  developmentErrors,
  productionErrors,
} from './utils/errorHandlers';

/**************** Routes Import ***************/
import userRoutes from './routes/user';
import chatRoomRoutes from './routes/chatRoom';

import connectDB from './db.config';

const app = express();
const {
  PORT = 8000,
  NODE_ENV = 'development',
  MONGODB_URI,
  SECRET_KEY,
} = process.env;
const corsHandler = cors();

/**************** Middleware Usage ******************/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  morgan(
    // eslint-disable-next-line max-len
    '":method :url HTTP/:http-version" :status :res[content-length] :remote-addr - :remote-user [:date[clf]]'
      .green.italic.bold,
    {
      skip: (req, res) => NODE_ENV === 'production' && res.statusCode < 400,
    }
  )
);
app.use(corsHandler);
app.options('*', corsHandler);

connectDB(MONGODB_URI);

/************ Routes Usage **********/
app.use('/user', userRoutes);
app.use('/chatrooms', chatRoomRoutes);

app.use(notFound, mongooseErrors);
if (NODE_ENV === 'development') app.use(developmentErrors);
else app.use(productionErrors);

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = jwt.verify(token, SECRET_KEY);
    socket.userId = payload.id;
    next();
  } catch (error) {
    next(new Error('unknown userId'));
  }
});

io.on('connection', (socket) => {
  console.log('Connected: ' + socket.userId);

  socket.on('disconnect', () => {
    console.log('Disconnected: ' + socket.userId);
  });
});

httpServer.listen(PORT, () =>
  console.log(
    `Server running in ${NODE_ENV} mode at http://localhost:${PORT}`.yellow.bold
  )
);

process.on('unhandledRejection', (error) => {
  console.log(`${error.name}: ${error.message}`.bgRed.black);
  server.close(() => process.exit(1));
});
