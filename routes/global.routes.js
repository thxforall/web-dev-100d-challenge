import express from 'express';

import {
  getSignUp,
  getLogin,
  postSignup,
  postLogin,
} from '../controllers/auth.controller';

import { getHome } from '../controllers/product.controller';

const globalRouter = express.Router();

globalRouter.route('/').get(getHome);
globalRouter.route('/signup').get(getSignUp).post(postSignup);
globalRouter.route('/login').get(getLogin).post(postLogin);

export default globalRouter;
