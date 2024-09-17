import {profileAPI} from "../api/api.ts";

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

const initialState = {
  posts: [
    {id: "1", message: "Hi, how are you?", likes: 12},
    {id: "2", message: "It's OK, thanks!", likes: 1},
    {id: "3", message: "Thanks!", likes: 0},
    {id: "4", message: "My nth Post", likes: 5},
    {id: "5", message: "Hello, World!", likes: 8},
  ],
  profile: {},
  status: "",
};

export const profileReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case ADD_POST: {
      const newPost = {
        id: String(state.posts.length + 2),
        message: action.newPost,
        likes: 0
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post: any) => post.id !== action.id)
      }
    }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      }
    default:
      return state;
  }
};

export const addPostActionCreator = (newPost: string) => ({type: ADD_POST, newPost});
export const deletePostActionCreator = (id: string) => ({type: DELETE_POST, id});
export const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status: any) => ({type: SET_STATUS, status});

export const getProfileThunkCreator = (userId: number) => async (dispatch: any) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(data));
};

export const getStatusThunkCreator = (userId: number) => async (dispatch: any) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(setStatus(data));
};

export const updateStatusThunkCreator = (text: string) => async (dispatch: any) => {
  const data = await profileAPI.updateStatus(text);

  if (data.resultCode === 0) {
    dispatch(setStatus(text));
  }
};
