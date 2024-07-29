export function handleErrors(error, req, res, next) {
  console.log(error);

  if (error.code === 400) {
    return res.status(404).render('shared/404');
  }
  res.status(500).render('shared/500');
}
