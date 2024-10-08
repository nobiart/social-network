import {updateObjectInArray} from "../utils/helpers.ts";
import {ProfilePhotosType} from "./types.ts";
import {Dispatch} from "redux";
import {BaseThunkType, InferActionsTypes} from "./reduxStore.ts";
import {usersAPI} from "../api/usersApi.ts";
import {ApiResponseType} from "../api/api.ts";

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
  filter: UsersFilterType,
  isFetching: boolean;
  isFollowingInProgress: number[]; // array of users IDs
}

export type UsersFilterType = {
  term: string,
  friend: boolean | null,
}

const initialState: UsersStateType = {
  users: [],
  pageSize: 10,
  totalCount: 0,
  currentPage: 1,
  filter: {
    term: "",
    friend: null,
  },
  isFetching: false,
  isFollowingInProgress: [], // array of users IDs
}

export type UsersActionsTypes = InferActionsTypes<typeof usersActions>;
export type UsersThunkType = BaseThunkType<UsersActionsTypes>;

export const usersReducer = (state = initialState, action: UsersActionsTypes): UsersStateType => {
  switch (action.type) {
    case "SN/USERS/FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: true}),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: false}),
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.users,
      }
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.pageNumber,
      }
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      }
    case "SET_TOTAL_COUNT":
      return {
        ...state,
        totalCount: action.count,
      }
    case "TOGGLE_IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case "TOGGLE_IS_FOLLOWING_PROGRESS":
      return {
        ...state,
        isFollowingInProgress: action.isFetching
          ? [...state.isFollowingInProgress, action.userId]
          : state.isFollowingInProgress.filter((id) => id !== action.userId)
      }
    default:
      return state;
  }
};

export const usersActions = {
  follow: (userId: number) => ({type: "SN/USERS/FOLLOW", userId} as const),
  unfollow: (userId: number) => ({type: "UNFOLLOW", userId} as const),
  setUsers: (users: UserType[]) => ({type: "SET_USERS", users} as const),
  setCurrentPage: (pageNumber: number) => ({type: "SET_CURRENT_PAGE", pageNumber} as const),
  setFilter: (filter: UsersFilterType) => ({type: "SET_FILTER", payload: filter} as const),
  setTotalCount: (count: number) => ({type: "SET_TOTAL_COUNT", count} as const),
  toggleFetching: (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const),
  toggleFollowing: (userId: number, isFetching: boolean) => ({
    type: "TOGGLE_IS_FOLLOWING_PROGRESS",
    userId,
    isFetching
  } as const),
}

export const getUsersThunkCreator = (page: number, pageSize: number, filter: UsersFilterType): UsersThunkType =>
  async (dispatch: Dispatch<UsersActionsTypes>) => {
    dispatch(usersActions.toggleFetching(true));
    dispatch(usersActions.setCurrentPage(page));
    dispatch(usersActions.setFilter(filter));
    const data = await usersAPI.getUsers(page, pageSize, filter);
    dispatch(usersActions.setUsers(data.items));
    dispatch(usersActions.setTotalCount(data.totalCount));
    dispatch(usersActions.toggleFetching(false));
  };

const _followUnfollowFlow = async (
  dispatch: Dispatch<UsersActionsTypes>,
  userId: number,
  apiMethod: (userId: number) => Promise<ApiResponseType>,
  actionCreator: (userId: number) => UsersActionsTypes
): Promise<void> => {
  dispatch(usersActions.toggleFollowing(userId, true));
  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(usersActions.toggleFollowing(userId, false));
}

export const followThunkCreator = (userId: number): UsersThunkType =>
  async (dispatch) => {
    const apiMethod = usersAPI.follow.bind(usersAPI);
    await _followUnfollowFlow(dispatch, userId, apiMethod, usersActions.follow);
  };

export const unfollowThunkCreator = (userId: number): UsersThunkType =>
  async (dispatch) => {
    const apiMethod = usersAPI.unfollow.bind(usersAPI);
    await _followUnfollowFlow(dispatch, userId, apiMethod, usersActions.unfollow);
  };
