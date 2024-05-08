import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const upload = multer({
  storage: multer.diskStorage({
    destination: 'product-data/images',
    filename: function (req, file, cb) {
      cb(null, uuidv4() + '-' + file.originalname);
    },
  }),
});

export const configureMulterMiddleware = upload.single('image');

