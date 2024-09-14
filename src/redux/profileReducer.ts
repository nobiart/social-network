import {profileAPI} from "../api/api.ts";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
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
  newPostText: "",
  profile: {},
  status: "",
};

export const profileReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case ADD_POST: {
      const newPost = {
        id: String(state.posts.length + 2),
        message: state.newPostText,
        likes: 0
      }
      return {
        ...state,
        newPostText: '',
        posts: [...state.posts, newPost],
      };
    }
    case UPDATE_NEW_POST_TEXT: {
      return {
        ...state,
        newPostText: action.newText,
      };
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

export const addPostActionCreator = () => ({type: ADD_POST});
export const updatePostTextActionCreator = (text: string) => (
  {
    type: UPDATE_NEW_POST_TEXT,
    newText: text
  }
);
export const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status: any) => ({type: SET_STATUS, status});

export const getProfileThunkCreator = (userId: number) => {
  return (dispatch: any) => {
    profileAPI.getProfile(userId)
      .then(data => dispatch(setUserProfile(data)));
  }
};

export const getStatusThunkCreator = (userId: number) => {
  return (dispatch: any) => {
    profileAPI.getStatus(userId)
      .then(data => dispatch(setStatus(data)));
  }
}

export const updateStatusThunkCreator = (text: string) => {
  return (dispatch: any) => {
    profileAPI.updateStatus(text)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(setStatus(text));
        }
      });
  }
}
