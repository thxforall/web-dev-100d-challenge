import express from 'express';
import bcrypt from 'bcryptjs';

import { getDb as db, getDb } from '../data/database.js';
import session from 'express-session';

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  let sessionInputData = req.session.inputData;
  if (!sessionInputData) {
    sessionInputData = {
      hashError: false,
      email: '',
      confirmEmail: '',
      password: '',
    };
  }
  res.session.inputData = null;

  res.render('signup', { inputData: sessionInputData });
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/signup', async function (req, res) {
  const userData = req.body;
  const enterdEmail = req.body.email;
  const enteredConfirmEmail = userData['confirm-email'];
  const enteredPassword = req.body.password;

  if (
    !enterdEmail ||
    !enteredConfirmEmail ||
    !enteredPassword ||
    enteredPassword.trim() < 6 ||
    enterdEmail !== enteredConfirmEmail ||
    !enterdEmail.includes('@')
  ) {
    req.session.inputData = {
      hashError: true,
      message: 'Invalid data - Please check your data',
      email: enterdEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };
    req.session.save(() => res.redirect('/signup'));
    return;
  } else {
    const existingEmail = getDb()
      .collection('users')
      .findOne({ email: enterdEmail });

    if (existingEmail) {
      console.log('Already existing email');
      return res.redirect('/signup');
    }

    const hashedPassword = await bcrypt.hash(enteredPassword, 12);

    await db()
      .collection('users')
      .insertOne({ email: enterdEmail, password: hashedPassword });

    res.redirect('/login');
  }
});

router.post('/login', async function (req, res) {
  const userData = req.body;
  const enterdEmail = userData.email;
  const enteredPassword = userData.password;

  const existingUser = await db()
    .collection('users')
    .findOne({ email: enterdEmail });

  if (!existingUser) {
    console.log('Could not log in!');
    return res.redirect('login');
  }

  const passwordAreEqaul = await bcrypt.compare(
    enteredPassword,
    existingUser.password,
  );
  if (!passwordAreEqaul) {
    console.log('Could not log in! - Password are not eqaul');
    return res.redirect('login');
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(() => res.redirect('/admin'));
});

router.get('/admin', function (req, res) {
  if (!req.session.isAuthenticated) {
    res.status(401).render('/401');
  }
  res.render('admin');
});

router.post('/logout', function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect('/');
});

export { router };
