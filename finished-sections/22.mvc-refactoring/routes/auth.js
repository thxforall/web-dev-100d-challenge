import express from 'express';

import {
  getHome,
  getLogin,
  userSignup,
  userLogout,
  userLogin,
} from '../controllers/auth-controller.js';

const router = express.Router();

router.get('/', getHome);

router.get('/signup', userSignup);

router.get('/login', getLogin);

router.post('/signup', userSignup);

router.post('/login', userLogin);

router.post('/logout', userLogout);

export { router as authRoutes };
