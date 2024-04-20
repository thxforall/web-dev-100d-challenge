import express from 'express';
import morgan from 'morgan';
import nodeSassMiddleware from 'node-sass-middleware';

import globalRouter from './routes/global.routes';
import authRouter from './routes/auth.routes';

const app = express();
const logger = morgan('dev');

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
  nodeSassMiddleware({
    src: process.cwd() + '/public/pre',
    dest: process.cwd() + '/public/dest',
    debug: true,
    outputStyle: 'compressed',
  }),
);
app.use(express.static('public'));

app.use('/', globalRouter);
app.use('/auth', authRouter);

export default app;
