import express from 'express';
import morgan from 'morgan';

import globalRouter from './routes/global.routes';
import authRouter from './routes/auth.routes';

const app = express();
const logger = morgan('dev');


app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');
app.use(logger);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.use('/', globalRouter);
app.use('/auth', authRouter);

export default app;
