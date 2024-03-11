import express from 'express';

const defaultRouters = express.Router();

defaultRouters.get('/', function (req, res) {
  res.render('index');
});

defaultRouters.get('/about', function (req, res) {
  res.render('about');
});

export { defaultRouters };
