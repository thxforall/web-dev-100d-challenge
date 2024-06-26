import express from 'express';

import {
  getProducts,
  getNewProduct,
  createNewProduct,
  getUpdateProduct,
  updateProduct,
  deleteProducts,
} from '../controllers/admin.controller';
import { configureMulterMiddleware } from '../middlewares/image-upload';

const adminRotuer = express.Router();

adminRotuer
  .route('/products')
  .get(getProducts)
  .post(configureMulterMiddleware, createNewProduct);
adminRotuer.route('/products/new').get(getNewProduct);
adminRotuer.route('/products/:id').get(getUpdateProduct).post(configureMulterMiddleware, updateProduct);
adminRotuer.route('/products/:id').delete(deleteProducts)

export default adminRotuer;
