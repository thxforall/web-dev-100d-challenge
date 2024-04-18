import express from 'express';
import session from 'express-session';
import mongoDBstore from 'connect-mongodb-session';

import { getDb as db, connectToDatabase } from './data/database.js';
import { router as demoRoutes } from './routes/demo.js';

const MongoDBstore = mongoDBstore(session);

const app = express();

const sessionStore = new MongoDBstore({
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
    secret: 'super secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  }),
);

app.use(async function (req, res, next) {
  const user = req.session.user;
  const isAuth = req.session.isAuthenticated;

  if (!user || !isAuth) {
    return next();
  }

  const userDoc = await db().collection('users').findOne({ _id: user.id });
  const isAdmin = userDoc.isAdmin;

  res.locals.isAuth = isAuth;
  res.locals.isAdmin = isAdmin;

  return next();
});

app.use(demoRoutes);

app.use(function (error, req, res, next) {
  res.render('500');
});

connectToDatabase().then(function () {
  console.log('http://localhost:3000');
  app.listen(3000);
});
