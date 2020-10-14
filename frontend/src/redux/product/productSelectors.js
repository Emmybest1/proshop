import { createSelector } from 'reselect';

const selectState = (state) => state.product;

export const selectProducts = createSelector(
  [selectState],
  (product) => product.products
);

export const selectProductError = createSelector(
  [selectState],
  (product) => product.error
);

export const selectIsLoading = createSelector(
  [selectState],
  (product) => product.isLoading
);
export const selectProduct = createSelector(
  [selectState],
  (product) => product.product
);
