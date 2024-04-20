export function getSignUp(req, res) {
  res.render('customer/auth/signup');
}

export function postSignup(req, res) {
  res.redirect('/login');
}

export function getLogin(req, res) {
  res.render('customer/auth/lgoin');
}
