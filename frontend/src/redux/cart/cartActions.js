import cartTypes from './cartTypes';

export const startAddCartItem = (productId, qty) => ({
  type: cartTypes.START_ADD_CART_ITEM,
  payload: { productId, qty },
});

export const addcartItem = (cartItem) => ({
  type: cartTypes.ADD_CART_ITEM,
  payload: cartItem,
});

export const removeCartitem = (cartItem) => ({
  type: cartTypes.REMOVE_CART_ITEM,
  payload: cartItem,
});

export const clearCartitems = () => ({
  type: cartTypes.CLEAR_CART_ITEMS,
});

export const addToCartError = (error) => ({
  type: cartTypes.ADD_CART_ERROR,
  payload: error,
});
