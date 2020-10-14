import userTypes from './userTypes';

export const userLoginStart = (email, password) => ({
  type: userTypes.USER_LOGIN_START,
  payload: { email, password },
});

export const userLoginSuccess = (userInfo) => ({
  type: userTypes.USER_LOGIN_SUCCESS,
  payload: userInfo,
});

export const userLoginFailure = (errorMessage) => ({
  type: userTypes.USER_LOGIN_FAILURE,
  payload: errorMessage,
});

export const userRegisterStart = (userInfo) => ({
  type: userTypes.USER_REGISTER_START,
  payload: userInfo,
});

export const userRegisterSuccess = (userInfo) => ({
  type: userTypes.USER_REGISTER_SUCCESS,
  payload: userInfo,
});

export const userRegisterFailure = (errorMessage) => ({
  type: userTypes.USER_REGISTER_FAILURE,
  payload: errorMessage,
});

export const getUserStart = (userInfo) => ({
  type: userTypes.GET_USER_START,
  payload: userInfo,
});

export const getUserSuccess = (loggedInUser) => ({
  type: userTypes.GET_USER_SUCCESS,
  payload: loggedInUser,
});

export const getUserFailure = (errorMessage) => ({
  type: userTypes.GET_USER_FAILURE,
  payload: errorMessage,
});

export const updateUserStart = (userInfo) => ({
  type: userTypes.UPDATE_USER_START,
  payload: userInfo,
});

export const updateUserSuccess = (updatedInfo) => ({
  type: userTypes.UPDATE_USER_SUCCESS,
  payload: updatedInfo,
});

export const updateUserFailure = (errorMessage) => ({
  type: userTypes.UPDATE_USER_FAILURE,
  payload: errorMessage,
});

export const updateUserReset = () => ({});

export const userLogoutSuccess = () => ({
  type: userTypes.USER_LOGOUT_SUCCESS,
});
