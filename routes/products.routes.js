import express from 'express';

import { getHome, getProductDetails } from '../controllers/product.controller';

const productRouter = express.Router();

productRouter.get('/products', getHome);
productRouter.get('/products/:id', getProductDetails);

export default productRouter;
