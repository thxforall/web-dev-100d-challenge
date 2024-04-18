import express from 'express';

import { getSignUp, getLogin } from '../controllers/auth.controller';

const router = express.Router();

router.get('/signup', getSignUp);
router.get('/login', getLogin);

export { router as authRoutes };
