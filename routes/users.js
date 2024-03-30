import express from 'express';
import multer from 'multer';

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

userRoutes.get('/', function (req, res) {
  res.render('profiles');
});

userRoutes.get('/new-user', function (req, res) {
  res.render('new-user');
});

userRoutes.post('/profiles', upload.single('image'), function (req, res) {
  const uploadedImageFile = req.file;
  const userData = req.body;

  console.log(uploadedImageFile);
  console.log(userData);

  res.redirect('/');
});

export default userRoutes;
