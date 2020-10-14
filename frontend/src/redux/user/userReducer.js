import userTypes from './userTypes';
const initialState = {
  isLoading: false,
  userInfo: null,
  userError: undefined,
  loggedInUserInfo: null,
  success: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.USER_LOGIN_START:
    case userTypes.USER_REGISTER_START:
    case userTypes.GET_USER_START:
    case userTypes.UPDATE_USER_START:
      return {
        ...state,
        isLoading: true,
        userError: undefined,
      };
    case userTypes.USER_LOGIN_SUCCESS:
    case userTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
      };
    case userTypes.USER_LOGIN_FAILURE:
    case userTypes.USER_REGISTER_FAILURE:
    case userTypes.GET_USER_FAILURE:
    case userTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        userError: action.payload,
        isLoading: false,
      };
    case userTypes.GET_USER_SUCCESS:
      return {
        ...state,
        loggedInUserInfo: action.payload,
        isLoading: false,
      };
    case userTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loggedInUserInfo: action.payload,
        isLoading: false,
        success: true,
      };
    case userTypes.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        userInfo: null,
        loggedInUserInfo: null,
        error: undefined,
      };
    default:
      return state;
  }
};

export default userReducer;
