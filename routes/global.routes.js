import express from 'express';

import {
  getSignUp,
  getLogin,
  postSignup,
  postLogin,
} from '../controllers/auth.controller';

const globalRouter = express.Router();

globalRouter.get('/', (req, res) => {
  res.redirect('/signup');
});

globalRouter.route('/signup').get(getSignUp).post(postSignup);
globalRouter.route('/login').get(getLogin).post(postLogin);

export default globalRouter;
