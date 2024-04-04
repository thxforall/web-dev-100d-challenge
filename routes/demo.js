import express from 'express';
import bcrypt from 'bcryptjs';

import { getDb as db } from '../data/database.js';

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  res.render('signup');
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/signup', async function (req, res) {
  const userData = req.body;
  const enterdEmail = req.body.email;
  const enteredConfirmEmail = userData['confirm-email'];
  const enteredPassword = req.body.password;

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  await db()
    .collection('users')
    .insertOne({ email: enterdEmail, password: hashedPassword });
  res.redirect('/login');
});

router.post('/login', async function (req, res) {
  const userData = req.body;
  const enterdEmail = req.body.email;
  const enteredPassword = req.body.password;

  const existingUser = await db()
    .collection('users')
    .findOne({ email: enterdEmail });

  if (!existingUser) {
    console.log('Could not log in!');
    return res.redirect('login');
  }
  res.redirect('/');
});

router.get('/admin', function (req, res) {
  res.render('admin');
});

router.post('/logout', function (req, res) {});

export { router };
