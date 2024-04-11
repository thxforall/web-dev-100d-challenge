import express from 'express';

import {
  getHome,
  getAdmin,
  createPost,
  getSinglePost,
  updatePost,
  postDelete,
} from '../controllers/post-controllers.js';

const router = express.Router();

router.get('/', getHome);

router.get('/admin', getAdmin);

router.post('/posts', createPost);

router.get('/posts/:id([0-9a-z]{24})/edit', getSinglePost);

router.post('/posts/:id([0-9a-z]{24})/edit', updatePost);

router.post('/posts/:id([0-9a-z]{24})/delete', postDelete);

export { router as blogRoutes };
