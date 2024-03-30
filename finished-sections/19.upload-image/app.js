import express from 'express';

import userRoutes from './routes/users.js';
import { connectToDatabase } from './data/database.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/images', express.static('images'));

app.use(userRoutes);

connectToDatabase().then(function () {
  console.log(`http://localhost:3000`);
  app.listen(3000);
});
