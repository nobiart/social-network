import {usersAPI} from "../api/api.ts";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
  users: [],
  pageSize: 5,
  totalCount: 0,
  currentPage: 1,
  isFetching: false,
  isFollowingInProgress: [],
}

export const usersReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u: any) => {
          if (u.id === action.userId) {
            return {...u, followed: true}
          }
          return u;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u: any) => {
          if (u.id === action.userId) {
            return {...u, followed: false}
          }
          return u;
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.pageNumber,
      }
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.count,
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        isFollowingInProgress: action.isFetching
          ? [...state.isFollowingInProgress, action.userId]
          : state.isFollowingInProgress.filter((id: number) => id !== action.userId)
      }
    default:
      return state;
  }
};

export const follow = (userId: number) => ({type: FOLLOW, userId});
export const unfollow = (userId: number) => ({type: UNFOLLOW, userId});
export const setUsers = (users: any) => ({type: SET_USERS, users});
export const setCurrentPage = (pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber});
export const setTotalCount = (count: number) => ({type: SET_TOTAL_COUNT, count});
export const toggleFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowing = (userId: number, isFetching: boolean) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  userId,
  isFetching
});

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
  return (dispatch: any) => {
    dispatch(toggleFetching(true));
    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(setUsers(data.items));
      dispatch(setTotalCount(data.totalCount));
      dispatch(toggleFetching(false));
    });
  }
};

export const followThunkCreator = (userId: number) => {
  return (dispatch: any) => {
    dispatch(toggleFollowing(userId, true));
    usersAPI.follow(userId).then((data) => {
      if (data.resultCode === 0) {
        dispatch(follow(userId));
      }
      dispatch(toggleFollowing(userId, false));
    });
  }
};

export const unfollowThunkCreator = (userId: number) => {
  return (dispatch: any) => {
    dispatch(toggleFollowing(userId, true));
    usersAPI.unfollow(userId).then((data) => {
      if (data.resultCode === 0) {
        dispatch(unfollow(userId));
      }
      dispatch(toggleFollowing(userId, false));
    });
  }
};
