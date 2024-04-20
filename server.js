import express from 'express';
import morgan from 'morgan';

import { connectToDatabase } from './data/database';
import globalRouter from './routes/global.routes';
import authRouter from './routes/auth.routes';

const app = express();
const logger = morgan('dev');

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');
app.use(logger);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', globalRouter);
app.use('/auth', authRouter);

connectToDatabase()
  .catch(function (error) {
    console.log('Failed to connect to the database!');
    console.log(error);
  });
export default app;
