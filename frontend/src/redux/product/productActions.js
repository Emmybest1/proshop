import productTypes from './productTypes';

export const fetchProductsStart = () => ({
  type: productTypes.FETCH_PRODUCTS_START,
});

export const fetchProductsSuccess = (products) => ({
  type: productTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: productTypes.FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchProductStart = (productId) => ({
  type: productTypes.FETCH_PRODUCT_START,
  payload: productId,
});

export const fetchProductSuccess = (product) => ({
  type: productTypes.FETCH_PRODUCT_SUCCESS,
  payload: product,
});

export const fetchProductFailure = (error) => ({
  type: productTypes.FETCH_PRODUCT_FAILURE,
  payload: error,
});
