import { Post } from '../model/post.js';

import {
  getSessionErrorData,
  flashErrorsToSession,
} from '../util/validation-session.js';

import { postIsValid } from '../util/validatoin.js';

export function getHome(req, res) {
  res.render('welcome');
}

export async function getAdmin(req, res) {
  if (!res.locals.isAuth) {
    return res.status(401).render('401');
  }

  const posts = await Post.fetchAll();

  const sessionErrorData = getSessionErrorData(req, { title: '', content: '' });

  res.render('admin', {
    posts: posts,
    inputData: sessionErrorData,
  });
}

export async function createPost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!postIsValid(enteredTitle, enteredContent)) {
    flashErrorsToSession(
      req,
      {
        message: 'Invalid input - please check your data.',
        title: enteredTitle,
        content: enteredContent,
      },
      function () {
        res.redirect('/admin');
      },
    );

    return; // or return res.redirect('/admin'); => Has the same effect
  }

  const post = new Post(enteredTitle, enteredContent);
  await post.save();

  res.redirect('/admin');
}

export async function getSinglePost(req, res) {
  const post = new Post(null, null, req.params.id);
  await post.fetch();

  if (!post.title || !post.content) {
    return res.render('404'); // 404.ejs is missing at this point - it will be added later!
  }

  const sessionErrorData = getSessionErrorData(req, {
    title: post.title,
    content: post.content,
  });

  post._id = post.id.toString();

  res.render('single-post', {
    post: post,
    inputData: sessionErrorData,
  });
}

export async function updatePost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!postIsValid(enteredTitle, enteredContent)) {
    flashErrorsToSession(
      req,
      {
        message: 'Invalid input - please check your data.',
        title: enteredTitle,
        content: enteredContent,
      },
      function () {
        res.redirect(`/posts/${req.params.id}/edit`);
      },
    );
    return;
  }

  const post = new Post(enteredTitle, enteredContent, req.params.id);
  await post.save();

  res.redirect('/admin');
}

export async function postDelete(req, res) {
  const post = new Post(null, null, req.params.id);
  await post.delete();

  res.redirect('/admin');
}
