import {usersAPI} from "../api/api.ts";
import {updateObjectInArray} from "../utils/helpers.ts";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
  users: [],
  pageSize: 10,
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
        users: updateObjectInArray(state.users, action.userId, "id", {followed: true}),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: false}),
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

export const follow = (userId: string) => ({type: FOLLOW, userId});
export const unfollow = (userId: string) => ({type: UNFOLLOW, userId});
export const setUsers = (users: any) => ({type: SET_USERS, users});
export const setCurrentPage = (pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber});
export const setTotalCount = (count: number) => ({type: SET_TOTAL_COUNT, count});
export const toggleFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowing = (userId: string, isFetching: boolean) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  userId,
  isFetching
});

export const getUsersThunkCreator = (page: number, pageSize: number) => async (dispatch: any) => {
  dispatch(toggleFetching(true));
  dispatch(setCurrentPage(page));
  const data = await usersAPI.getUsers(page, pageSize);
  dispatch(setUsers(data.items));
  dispatch(setTotalCount(data.totalCount));
  dispatch(toggleFetching(false));
};

const followUnfollowFlow = async (
  dispatch: any,
  userId: string,
  apiMethod: any,
  actionCreator: any
) => {
  dispatch(toggleFollowing(userId, true));
  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowing(userId, false));
}

export const followThunkCreator = (userId: string) => (dispatch: any) => {
  const apiMethod = usersAPI.follow.bind(usersAPI);
  followUnfollowFlow(dispatch, userId, apiMethod, follow);
};

export const unfollowThunkCreator = (userId: string) => (dispatch: any) => {
  const apiMethod = usersAPI.unfollow.bind(usersAPI);
  followUnfollowFlow(dispatch, userId, apiMethod, unfollow);
};
