import User from '../models/user.model';

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
