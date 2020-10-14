import Product from '../models/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

//@description Get all products
//@routes      GET /api/v1/products
//@access      Public
const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});

  res
    .status(200)
    .json({ success: true, count: products.length, data: products });
});

//@description Get a single product using id
//@routes      GET /api/v1/product
//@access      Public
const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: product });
});

export { getProduct, getProducts };
