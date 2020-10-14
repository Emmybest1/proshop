import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import productReducer from './product/productReducer';
import cartReducer from './cart/cartReducer';
import userReducer from './user/userReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'user'],
};

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
