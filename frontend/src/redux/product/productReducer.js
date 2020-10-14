import productTypes from './productTypes';
const initialState = {
  products: [],
  isLoading: true,
  error: null,
  product: { reviews: [] },
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productTypes.FETCH_PRODUCTS_START:
    case productTypes.FETCH_PRODUCT_START:
      return {
        ...state,
        isLoading: true,
      };
    case productTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    case productTypes.FETCH_PRODUCTS_FAILURE:
    case productTypes.FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case productTypes.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
