import { takeLatest, put, call, all } from 'redux-saga/effects';
import axios from 'axios';

import userTypes from './userTypes';
import {
  userLoginSuccess,
  userLoginFailure,
  userRegisterSuccess,
  userRegisterFailure,
  getUserFailure,
  getUserSuccess,
  updateUserSuccess,
  updateUserFailure,
} from './userActions';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

function* asyncUserLogin({ payload: { email, password } }) {
  try {
    const { data } = yield axios.post(
      `api/v1/users/login`,
      { email, password },
      config
    );
    yield put(userLoginSuccess(data));
  } catch (error) {
    yield put(
      userLoginFailure(
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message
      )
    );
  }
}

function* asyncRegisterUser({ payload }) {
  try {
    const { data } = yield axios.post(`api/v1/users`, payload, config);
    yield put(userRegisterSuccess(data));
  } catch (error) {
    yield put(
      userRegisterFailure(
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message
      )
    );
  }
}

function* asyncGetUserProfile({ payload }) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payload.token}`,
    },
  };

  try {
    const { data } = yield axios.get(`/api/v1/users/profile/`, config);
    yield put(getUserSuccess(data));
  } catch (error) {
    yield put(
      getUserFailure(
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message
      )
    );
  }
}

function* asyncUpdateUserProfile({ payload }) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payload.token}`,
    },
  };
  try {
    const { data } = yield axios.put(`api/v1/users/profile`, payload, config);
    yield put(updateUserSuccess(data));
  } catch (error) {
    yield put(
      updateUserFailure(
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message
      )
    );
  }
}

function* onUserLoginStart() {
  yield takeLatest(userTypes.USER_LOGIN_START, asyncUserLogin);
}

function* onRegisterUserStart() {
  yield takeLatest(userTypes.USER_REGISTER_START, asyncRegisterUser);
}

function* onGetUserStart() {
  yield takeLatest(userTypes.GET_USER_START, asyncGetUserProfile);
}

function* onUpdateUserStart() {
  yield takeLatest(userTypes.UPDATE_USER_START, asyncUpdateUserProfile);
}

export function* userSaga() {
  yield all([
    call(onUserLoginStart),
    call(onRegisterUserStart),
    call(onGetUserStart),
    call(onUpdateUserStart),
  ]);
}
