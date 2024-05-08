import express from 'express';

import {
  getProducts,
  getNewProduct,
  createNewProduct,
} from '../controllers/admin.controller';

const adminRotuer = express.Router();

adminRotuer.route('/products').get(getProducts);
adminRotuer.route('/products/new').get(getNewProduct);

export default adminRotuer;
