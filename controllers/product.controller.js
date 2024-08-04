import Product from '../models/product.model';

export async function getHome(req, res) {
  try {
    const products = await Product.findAll();
    res.render('customer/products/all-products', { products });
  } catch (error) {
    next(error);
  }
}

export async function getProductDetails(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render('customer/products/product-details', { product });
  } catch (error) {
    next(error);
  }
}
