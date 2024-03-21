import express from 'express';

const blogRoutes = express.Router();

blogRoutes.get('/', function (req, res) {
  res.redirect('/posts');
});

blogRoutes.get('/posts', function (req, res) {
  res.render('posts-list');
});

blogRoutes.get('/new-post', function(req,res) {
  res.render('create-post');
});

export default blogRoutes;
