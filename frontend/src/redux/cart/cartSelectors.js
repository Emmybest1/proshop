import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectIsLoadingCart = createSelector(
  [selectCart],
  (cart) => cart.isLoading
);

export const selectTotalQty = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.qty;
  }, 0)
);

export const selectTotalPrice = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.qty * cartItem.price;
  }, 0)
);
