import { all, call } from 'redux-saga/effects';
import { productSaga } from './product/productSagas';
import { cartSaga } from './cart/cartSagas';
import { userSaga } from './user/userSagas';

export default function* rootSaga() {
  yield all([call(productSaga), call(userSaga), call(cartSaga)]);
}
