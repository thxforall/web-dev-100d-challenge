import Product from '../models/product.model';
import { ObjectId } from 'mongodb';

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

export async function getUpdateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render('admin/products/update-product', { product });
  } catch (error) {
    next(error);
    return;
  }
}

export async function updateProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    product.replaceImage(req.file.filenmae);
  }

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect('/admin/products');
}
