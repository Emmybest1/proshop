import { takeLatest, all, call, put } from 'redux-saga/effects';
import axios from 'axios';

import productTypes from './productTypes';
import {
  fetchProductsFailure,
  fetchProductsSuccess,
  fetchProductSuccess,
  fetchProductFailure,
} from './productActions';

function* asyncFetchProductsStart() {
  try {
    const {
      data: { data },
    } = yield axios.get('/api/v1/products/');
    yield put(fetchProductsSuccess(data));
  } catch (error) {
    yield put(
      fetchProductsFailure(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
}

function* asyncFetchProductStart({ payload }) {
  try {
    const {
      data: { data },
    } = yield axios.get(`/api/v1/products/${payload}`);
    yield put(fetchProductSuccess(data));
  } catch (error) {
    yield put(
      fetchProductFailure(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
}

function* onFetchProductsStart() {
  yield takeLatest(productTypes.FETCH_PRODUCTS_START, asyncFetchProductsStart);
}

function* onFetchProductStart() {
  yield takeLatest(productTypes.FETCH_PRODUCT_START, asyncFetchProductStart);
}

export function* productSaga() {
  yield all([call(onFetchProductsStart), call(onFetchProductStart)]);
}
