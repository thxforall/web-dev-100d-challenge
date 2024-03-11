import express from 'express';

import { v4 as uuidv4 } from 'uuid';

import {
  getStoredRestaurant,
  storeRestaurants,
} from '../util/restaurant-data.js';

const restaurantRouters = express.Router();

restaurantRouters.get('/restaurants', function (req, res) {
  let order = req.query.order;
  let nextOrder = 'desc';

  if (order !== 'asc' && order !== 'desc') {
    order = 'asc';
  }

  if (order === 'desc') {
    nextOrder = 'asc';
  }

  const storeRestaurants = getStoredRestaurant();

  storeRestaurants.sort(function (resA, resB) {
    if (
      (order === 'asc' && resA.name > resB.name) ||
      (order === 'desc' && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render('restaurants', {
    numberOfRestaurants: storeRestaurants.length,
    restaurants: storeRestaurants,
    nextOrder: nextOrder,
  });
});

restaurantRouters.get('/restaurants/:id', function (req, res) {
  const restaurantId = req.params.id;

  const storeRestaurants = getStoredRestaurant();

  for (const restaurant of storeRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render('restaurants-detail', { restaurant: restaurant });
    }
  }
  res.status(404).render('404');
});

restaurantRouters.get('/recommend', function (req, res) {
  res.render('recommend');
});

restaurantRouters.post('/recommend', function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuidv4();
  const restaurants = getStoredRestaurant();

  restaurants.push(restaurant);

  storeRestaurants(restaurants);

  res.redirect('/confirm');
});

restaurantRouters.get('/confirm', function (req, res) {
  res.render('confirm');
});

export { restaurantRouters };
