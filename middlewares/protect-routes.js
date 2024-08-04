export const protectRotuesMiddleWare = (req, res, next) => {
  
  if (req.path.startsWith('/admin') && !res.locals.isAdmin) {
    return res.redirect('/403');
  }
  
  if (!res.locals.isAuth) {
    return res.redirect('/401');
  }

  next();
};
