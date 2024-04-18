import express from 'express';
import nodeSassMiddleware from 'node-sass-middleware';

import { authRoutes } from './routes/auth.routes';

const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');

app.use(
  nodeSassMiddleware({
    src: process.cwd() + '/public/src',
    dest: process.cwd() + '/public/dest',
    debug: true,
    outputStyle: 'compressed',
  }),
);
app.use(express.static('public'));

app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Welcome to http://localhost:${PORT} 🚀`);
});
