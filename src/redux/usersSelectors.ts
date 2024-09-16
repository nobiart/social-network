export const getUsers = (state: any) => {
  return state.usersPage.users;
};

export const getPageSize = (state: any) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: any) => {
  return state.usersPage.totalCount;
};

export const getCurrentPage = (state: any) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state: any) => {
  return state.usersPage.isFetching;
};

export const getFollowingProgress = (state: any) => {
  return state.usersPage.isFollowingInProgress;
};
