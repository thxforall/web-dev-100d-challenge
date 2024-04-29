import User from '../models/user.model';
import { createUserSession } from '../util/authentication';

export function getSignUp(req, res) {
  res.render('customer/auth/signup');
}

export async function postSignup(req, res) {
  const inputData = req.body;
  const user = new User(
    inputData.email,
    inputData.password,
    inputData.fullName,
    inputData.street,
    inputData.postal,
    inputData.city,
  );

  await user.signUp();

  res.redirect('/login');
}

export function getLogin(req, res) {
  res.render('customer/auth/login');
}

export async function postLogin(req, res) {
  const inputData = req.body;
  const user = new User(inputData.email, inputData.password);
  const existingUser = await user.getUserWithSameEmail();

  if (!existingUser) {
    res.redirect('/login');
    return;
  }

  const passwordIsMatched = await user.hasMatchingPassword(
    existingUser.password,
  );

  if (!passwordIsMatched) {
    res.redirect('/login');
    return;
  }

  createUserSession(req, existingUser, function () {
    res.redirect('/');
  });
}
