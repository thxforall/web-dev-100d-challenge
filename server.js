import express from 'express';
import morgan from 'morgan';
import expressSession from 'express-session';

import { createSessionConfig } from './config/session';
import { connectToDatabase } from './data/database';
import globalRouter from './routes/global.routes';
import authRouter from './routes/auth.routes';
import productRouter from './routes/products.routes';
import { handleErrors } from './middlewares/error-handler';

const app = express();
const logger = morgan('dev');
const sessionConfig = createSessionConfig();

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');

app.use(expressSession(sessionConfig));
app.use(logger);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', globalRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use(handleErrors);

connectToDatabase().catch(function (error) {
  console.log('Failed to connect to the database!');
  console.log(error);
});
export default app;
