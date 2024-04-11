import { Post } from '../model/post.js';

export function getHome(req, res) {
  res.render('welcome');
}

export async function getAdmin(req, res) {
  if (!res.locals.isAuth) {
    return res.status(401).render('401');
  }

  const posts = await Post.fetchAll();

  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      title: '',
      content: '',
    };
  }

  req.session.inputData = null;

  res.render('admin', {
    posts: posts,
    inputData: sessionInputData,
  });
}

export async function createPost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (
    !enteredTitle ||
    !enteredContent ||
    enteredTitle.trim() === '' ||
    enteredContent.trim() === ''
  ) {
    req.session.inputData = {
      hasError: true,
      message: 'Invalid input - please check your data.',
      title: enteredTitle,
      content: enteredContent,
    };

    res.redirect('/admin');
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

  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      title: post.title,
      content: post.content,
    };
  }

  req.session.inputData = null;
  post._id = post.id.toString();

  res.render('single-post', {
    post: post,
    inputData: sessionInputData,
  });
}

export async function updatePost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (
    !enteredTitle ||
    !enteredContent ||
    enteredTitle.trim() === '' ||
    enteredContent.trim() === ''
  ) {
    req.session.inputData = {
      hasError: true,
      message: 'Invalid input - please check your data.',
      title: enteredTitle,
      content: enteredContent,
    };

    res.redirect(`/posts/${req.params.id}/edit`);
    return;
  }

  console.log(enteredTitle, enteredContent, req.params.id);
  const post = new Post(enteredTitle, enteredContent, req.params.id);
  await post.save();

  res.redirect('/admin');
}

export async function postDelete(req, res) {
  const post = new Post(null, null, req.params.id);
  await post.delete();

  res.redirect('/admin');
}
