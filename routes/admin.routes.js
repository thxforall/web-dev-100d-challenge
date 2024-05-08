import express from 'express';

import {
  getProducts,
  getNewProduct,
  createNewProduct,
} from '../controllers/admin.controller';
import { configureMulterMiddleware } from '../middlewares/image-upload';

const adminRotuer = express.Router();

adminRotuer
  .route('/products')
  .get(getProducts)
  .post(configureMulterMiddleware, createNewProduct);
adminRotuer.route('/products/new').get(getNewProduct);

export default adminRotuer;
    