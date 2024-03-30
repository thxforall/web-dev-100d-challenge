import express from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../data/database.js';

const blogRoutes = express.Router();

blogRoutes.get('/', function (req, res) {
  res.redirect('/posts');
});

blogRoutes.get('/posts', async function (req, res) {
  const posts = await getDb()
    .collection('posts')
    .find({})
    .project({ title: true, summary: true, 'author.name': true })
    .toArray();
  res.render('posts-list', { posts });
});

blogRoutes.get('/posts/:id([0-9a-f]{24})', async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const post = await getDb()
    .collection('posts')
    .findOne({ _id: postId }, { summary: false });
  if (!post) {
    return res.status(404).render('404');
  }
  post.humanReadalbeDate = post.date.toLocaleDateString('ko-KR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  post.date = post.date.toISOString();
  res.render('post-detail', { post });
});

blogRoutes.get('/posts/:id([0-9a-f]{24})/edit', async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const post = await getDb()
    .collection('posts')
    .findOne({ _id: postId }, { title: true, summary: true, body: true });
  if (!post) {
    return res.status(404).render('404');
  }
  res.render('update-post', { post });
});

blogRoutes.post('/posts/:id([0-9a-f]{24})/edit', async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const postDetail = req.body;
  await getDb()
    .collection('posts')
    .updateOne(
      { _id: postId },
      {
        $set: {
          title: postDetail.title,
          summary: postDetail.summary,
          body: postDetail.content,
          date: new Date(),
        },
      },
    );
  res.redirect('/posts');
});

blogRoutes.post('/posts/:id([0-9a-f]{24})/delete', async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const result = await getDb().collection('posts').deleteOne({ _id: postId });
  res.redirect('/posts');
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
