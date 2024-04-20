import express from 'express';

import {
  getSignUp,
  getLogin,
  postSignup,
} from '../controllers/auth.controller';

const globalRouter = express.Router();

globalRouter.get('/', (req, res) => {
  res.redirect('/signup');
});

globalRouter.route('/signup').get(getSignUp).post(postSignup);
globalRouter.get('/login', getLogin);

export default globalRouter;
