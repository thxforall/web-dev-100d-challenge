import express from 'express';

import { getDb as db, connectToDatabase } from './data/database.js';
import { router as demoRoutes } from './routes/demo.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(demoRoutes);

app.use(function (error, req, res, next) {
  res.render('500');
});

connectToDatabase().then(function () {
  console.log('http://localhost:3000');
  app.listen(3000);
});
