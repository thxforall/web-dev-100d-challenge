import express from 'express';
import session from 'express-session';
// import { doubleCsrf } from 'csrf-csrf';

import { connect } from './data/database.js';
import { createSessionStore, createSessionConfig } from './config/session.js';
import { authMiddleware } from './middlewares/auth-middleware.js';
import { authRoutes } from './routes/auth.js';
import { blogRoutes } from './routes/blog.js';

const mongodbSessionStore = createSessionStore(session);

const app = express();

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session(createSessionConfig(mongodbSessionStore)));
// app.use(doubleCsrf());

app.use(authMiddleware);

app.use(authRoutes);
app.use(blogRoutes);

app.use(function (error, req, res, next) {
  console.log(error);
  res.render('500');
});

connect().then(function () {
  console.log('http://localhost:3000/');
  app.listen(3000);
});
