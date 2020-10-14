import cartTypes from './cartTypes';
import { addCartItem, removeCartItem } from './cartUtils';

const initialState = {
  isLoading: true,
  cartItems: [],
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartTypes.START_ADD_CART_ITEM:
      return {
        ...state,
        isLoading: true,
      };
    case cartTypes.ADD_CART_ITEM:
      return {
        ...state,
        cartItems: addCartItem(state.cartItems, action.payload),
        isLoading: false,
      };
    case cartTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: removeCartItem(state.cartItems, action.payload),
        isLoading: false,
      };
    case cartTypes.ADD_CART_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
