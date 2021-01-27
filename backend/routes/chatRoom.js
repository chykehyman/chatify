import express from 'express';
import { catchErrors } from '../utils/errorHandlers';
import auth from '../middlewares/auth';

import { createChatRoom, getAllChatRooms } from '../controllers/chatRoom';

const router = express.Router();

router
  .route('/')
  .post(auth, catchErrors(createChatRoom))
  .get(auth, getAllChatRooms);

export default router;
