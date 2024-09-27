import {usersAPI} from "../api/api.ts";
import {updateObjectInArray} from "../utils/helpers.ts";
import {ProfilePhotosType} from "./types.ts";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore.ts";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

export type UserType = {
  id: number;
  name: string;
  status: string;
  photos: ProfilePhotosType;
  followed: boolean;
}

type UsersStateType = {
  users: UserType[];
  pageSize: number;
  totalCount: number;
  currentPage: number;
  isFetching: boolean;
  isFollowingInProgress: number[]; // array of users IDs
}

const initialState: UsersStateType = {
  users: [],
  pageSize: 10,
  totalCount: 0,
  currentPage: 1,
  isFetching: false,
  isFollowingInProgress: [],
}

type CommonUsersActionsType =
  FollowActionType
  | UnfollowActionType
  | SetUsersActionType
  | SetCurrentPageActionType
  | SetTotalCountActionType
  | ToggleFetchingActionType
  | ToggleFollowingActionType;

export const usersReducer = (state = initialState, action: CommonUsersActionsType): UsersStateType => {
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

type FollowActionType = {
  type: typeof FOLLOW;
  userId: number;
}
export const follow = (userId: number): FollowActionType => ({type: FOLLOW, userId});

type UnfollowActionType = {
  type: typeof UNFOLLOW;
  userId: number;
}
export const unfollow = (userId: number): UnfollowActionType => ({type: UNFOLLOW, userId});

type SetUsersActionType = {
  type: typeof SET_USERS;
  users: UserType[];
}
export const setUsers = (users: UserType[]): SetUsersActionType => ({type: SET_USERS, users});

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE;
  pageNumber: number;
}
export const setCurrentPage = (pageNumber: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, pageNumber});

type SetTotalCountActionType = {
  type: typeof SET_TOTAL_COUNT;
  count: number;
}
export const setTotalCount = (count: number): SetTotalCountActionType => ({type: SET_TOTAL_COUNT, count});

type ToggleFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
}
export const toggleFetching = (isFetching: boolean): ToggleFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});

type ToggleFollowingActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  userId: number;
  isFetching: boolean;
}
export const toggleFollowing = (userId: number, isFetching: boolean): ToggleFollowingActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  userId,
  isFetching
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, CommonUsersActionsType>;

export const getUsersThunkCreator = (page: number, pageSize: number): ThunkType =>
  async (dispatch) => {
    dispatch(toggleFetching(true));
    dispatch(setCurrentPage(page));
    const data = await usersAPI.getUsers(page, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
    dispatch(toggleFetching(false));
  };

const _followUnfollowFlow = async (
  dispatch: Dispatch<CommonUsersActionsType>,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => FollowActionType | UnfollowActionType
) => {
  dispatch(toggleFollowing(userId, true));
  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowing(userId, false));
}

export const followThunkCreator = (userId: number): ThunkType =>
  async (dispatch) => {
    const apiMethod = usersAPI.follow.bind(usersAPI);
    _followUnfollowFlow(dispatch, userId, apiMethod, follow);
  };

export const unfollowThunkCreator = (userId: number): ThunkType =>
  async (dispatch) => {
    const apiMethod = usersAPI.unfollow.bind(usersAPI);
    _followUnfollowFlow(dispatch, userId, apiMethod, unfollow);
  };
