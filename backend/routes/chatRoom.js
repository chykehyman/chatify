import express from 'express';
import { catchErrors } from '../utils/errorHandlers';
import auth from '../middlewares/auth';

import { createChatRoom } from '../controllers/chatRoom';

const router = express.Router();

router.post('/', auth, catchErrors(createChatRoom));

export default router;
