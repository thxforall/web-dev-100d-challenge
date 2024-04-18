import path from 'path';
import { fileURLToPath } from 'url';

import { defaultRouters } from './routes/default.js';
import { restaurantRouters } from './routes/restaurant.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', defaultRouters);
app.use('/', restaurantRouters);

app.use(function (req, res) {
  res.status(404).render('404');
});

app.use(function (error, req, res, next) {
  res.status(500).render('500');
});

app.listen(3000);
