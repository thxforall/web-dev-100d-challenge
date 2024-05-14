import Product from '../models/product.model';

export async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render('admin/products/all-products', { products });
  } catch (error) {
    next(error);
    return;
  }
}
export function getNewProduct(req, res) {
  res.render('admin/products/new-products');
}
export async function createNewProduct(req, res, next) {
  const product = new Product({ ...req.body, image: req.file.filename });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect('/admin/products');
}

export function getUpdateProduct() {}

export function updateProduct() {}
