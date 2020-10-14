import cartTypes from './cartTypes';
import axios from 'axios';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { addcartItem, addToCartError } from './cartActions';

function* asynAddItem({ payload: { productId, qty } }) {
  try {
    const {
      data: { data },
    } = yield axios.get(`/api/v1/products/${productId}`);
    yield put(addcartItem({ ...data, qty }));
  } catch (error) {
    yield put(addToCartError(error));
  }
}

function* onAddCartItem() {
  yield takeLatest(cartTypes.START_ADD_CART_ITEM, asynAddItem);
}

export function* cartSaga() {
  yield all([call(onAddCartItem)]);
}
