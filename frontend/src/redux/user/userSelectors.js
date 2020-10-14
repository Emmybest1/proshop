import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectUserInfo = createSelector(
  [selectUser],
  (user) => user.userInfo
);

export const selectLoggedInUserInfo = createSelector(
  [selectUser],
  (user) => user.loggedInUserInfo
);

export const selectIsLoading = createSelector(
  [selectUser],
  (user) => user.isLoading
);

export const selectUserError = createSelector(
  [selectUser],
  (user) => user.userError
);

export const selectSuccess = createSelector(
  [selectUser],
  (user) => user.success
);
