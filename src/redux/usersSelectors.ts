import {AppStateType} from "./reduxStore.ts";

export const getUsersSelector = (state: AppStateType) => {
  return state.usersPage.users;
};

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalCount;
};

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};

export const getFollowingProgress = (state: AppStateType) => {
  return state.usersPage.isFollowingInProgress;
};

export const getUsersFilter = (state: AppStateType) => {
  return state.usersPage.filter;
}
