import express from 'express';
import mongodb from 'mongodb';

import { db } from '../data/database.js';

const ObjectId = mongodb.ObjectId;

const blogRoutes = express.Router();

blogRoutes.get('/', function (req, res) {
  res.redirect('/posts');
});

blogRoutes.get('/posts', async function (req, res) {
  const posts = await db()
    .collection('posts')
    .find({}, { title: 1, summary: 1, 'author.name': 1 })
    .toArray();
  res.render('posts-list', { posts: posts });
});

blogRoutes.get('/new-post', async function (req, res) {
  const authors = await db().collection('authors').find().toArray();
  res.render('create-post', { authors: authors });
});

blogRoutes.post('/posts', async function (req, res) {
  const authorId = new ObjectId(req.body.author);
  const author = await db().collection('authors').findOne({ _id: authorId });

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

  const result = await db().collection('posts').insertOne(newPost);
  console.log(result);
  res.redirect('/posts');
});

blogRoutes.get('/posts/:id', async function (req, res) {
  const postId = req.params.id;
  const post = await db()
    .collection('posts')
    .findOne({ _id: new ObjectId(postId) }, { summary: 0 });

  if (!post) {
    return res.status(404).render('404');
  }

  post.humanReadableDate = post.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  post.date = post.date.toISOString();

  res.render('post-detail', { post: post, comments: null });
});

blogRoutes.get('/posts/:id/edit', async function (req, res) {
  const postId = req.params.id;
  const post = await db()
    .collection('posts')
    .findOne({ _id: new ObjectId(postId) }, { title: 1, summary: 1, body: 1 });

  if (!post) {
    return res.status(404).render('404');
  }

  res.render('update-post', { post: post });
});

blogRoutes.post('/posts/:id/edit', async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const result = await db()
    .collection('posts')
    .updateOne(
      { _id: postId },
      {
        $set: {
          title: req.body.title,
          summary: req.body.summary,
          body: req.body.content,
          // date: new Date()
        },
      },
    );

  res.redirect('/posts');
});

blogRoutes.post('/posts/:id/delete', async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const result = await db().collection('posts').deleteOne({ _id: postId });
  res.redirect('/posts');
});

blogRoutes.get('/posts/:id/comments', async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const post = await db().collection('posts').findOne({ _id: postId });
  const comments = await db()
    .collection('comments')
    .find({ postId: postId })
    .toArray();

  return res.render('post-detail', { post: post, comments: comments });
});

blogRoutes.post('/posts/:id/comments', async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const newComment = {
    postId: postId,
    title: req.body.title,
    text: req.body.text,
  };
  await db().collection('comments').insertOne(newComment);
  res.redirect('/posts/' + req.params.id);
});

export default blogRoutes;
