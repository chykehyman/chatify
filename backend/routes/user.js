import express from 'express';
import { catchErrors } from '../utils/errorHandlers';

import { loginUser, registerUser } from '../controllers/user';

const router = express.Router();

router.post('/register', catchErrors(registerUser));
router.post('/login', catchErrors(loginUser));

export default router;
