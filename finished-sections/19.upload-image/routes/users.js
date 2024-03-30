import express from 'express';
import multer from 'multer';

import { db } from '../data/database.js';

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storageConfig });
const userRoutes = express.Router();

userRoutes.get('/', async function (req, res) {
  const userProfiles = await db().collection('users').find().toArray();
  res.render('profiles', { userProfiles });
});

userRoutes.get('/new-user', function (req, res) {
  res.render('new-user');
});

userRoutes.post('/profiles', upload.single('image'), async function (req, res) {
  const uploadedImageFile = req.file;
  const userData = req.body;

  await db().collection('users').insertOne({
    name: userData.username,
    imagePath: uploadedImageFile.path,
  });

  res.redirect('/');
});

export default userRoutes;
