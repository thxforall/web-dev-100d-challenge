export function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  req.session.save(action);
}

export function deleteUserAuthSession(req) {
  req.session.uid = null;
  req.session.save();
}
