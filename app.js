import express from 'express';
import session from 'express-session';
import mongodbStore from 'connect-mongodb-session';
// import { doubleCsrf } from 'csrf-csrf';

import { connect } from './data/database.js';

import { blogRoutes } from './routes/blog.js';

const MongoDBStore = mongodbStore(session);

const app = express();

const sessionStore = new MongoDBStore({
  uri: 'mongodb://localhost:27017',
  databaseName: 'auth-demo',
  collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'super-secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  }),
);
// app.use(doubleCsrf());

app.use(async function (req, res, next) {
  const user = req.session.user;
  const isAuth = req.session.isAuthenticated;

  if (!user || !isAuth) {
    return next();
  }

  res.locals.isAuth = isAuth;

  next();
});

app.use(blogRoutes);

app.use(function (error, req, res, next) {
  console.log(error);
  res.render('500');
});

connect().then(function () {
  console.log('http://localhost:3000/');
  app.listen(3000);
});
