import express from 'express';
import ObjectId from 'mongodb';
import { getDb } from '../data/database.js';

const blogRoutes = express.Router();

blogRoutes.get('/', function (req, res) {
  res.redirect('/posts');
});

blogRoutes.get('/posts', function (req, res) {
  res.render('posts-list');
});

blogRoutes.get('/new-post', async function (req, res) {
  const authors = await getDb().collection('authors').find().toArray();
  res.render('create-post', { authors });
});

blogRoutes.post('/posts', async function (req, res) {
  const authorId = new ObjectId(req.body.author);
  const author = await getDb().collection('authors').findOne({ _id: authorId });

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email,
    },
  };
  const result = await getDb().collection('posts').insertOne(newPost);
  console.log(result);
  res.redirect('/posts');
});

export default blogRoutes;
