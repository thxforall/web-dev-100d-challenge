import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';
import { error } from 'console';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/restaurants', function (req, res) {
  const filePath = path.join(__dirname, 'data', 'restaurants.json');

  const fileData = fs.readFileSync(filePath);
  const storeRestaurants = JSON.parse(fileData);

  res.render('restaurants', {
    numberOfRestaurants: storeRestaurants.length,
    restaurants: storeRestaurants,
  });
});

app.get('/restaurants/:id', function (req, res) {
  const restaurantId = req.params.id;
  const filePath = path.join(__dirname, 'data', 'restaurants.json');

  const fileData = fs.readFileSync(filePath);
  const storeRestaurants = JSON.parse(fileData);

  for (const restaurant of storeRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render('restaurants-detail', { restaurant: restaurant });
    }
  }
  res.status(404).render('404');
});

app.get('/recommend', function (req, res) {
  res.render('recommend');
});

app.post('/recommend', function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuidv4();
  const restaurants = getStoredRestaurant();

  restaurants.push(restaurant);

  storeRestaurants(restaurants);

  res.redirect('/confirm');
});

app.get('/confirm', function (req, res) {
  res.render('confirm');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.use(function (req, res) {
  res.status(404).render('404');
});

app.use(function (error, req, res, next) {
  res.status(500).render('500');
});

app.listen(3000);
