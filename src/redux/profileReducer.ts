import {profileAPI} from "../api/api.ts";
import {ProfilePhotosType} from "./types.ts";

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_PROFILE_PHOTO = 'SET_PROFILE_PHOTO';

type PostItemType = {
  id: number;
  message: string;
  likes: number;
}

type ProfileContactsType = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
}

type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ProfileContactsType;
  photos: ProfilePhotosType;
}

type ProfileStateType = {
  posts: PostItemType[] | null;
  profile: ProfileType | null;
  status: string | null;
  profilePhoto: File | null;
}

const initialState: ProfileStateType = {
  posts: [
    {id: 1, message: "Hi, how are you?", likes: 12},
    {id: 2, message: "It's OK, thanks!", likes: 1},
    {id: 3, message: "Thanks!", likes: 0},
    {id: 4, message: "My nth Post", likes: 5},
    {id: 5, message: "Hello, World!", likes: 8},
  ],
  profile: null,
  status: "",
  profilePhoto: null,
};

export const profileReducer = (state = initialState, action: any): ProfileStateType => {
  switch (action.type) {
    case ADD_POST: {
      const newPost = {
        id: (state.posts?.length ?? 0) + 2,
        message: action.newPost,
        likes: 0
      }
      return {
        ...state,
        posts: [...state.posts!, newPost],
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: (state.posts ?? []).filter((post: PostItemType) => post.id !== action.id)
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
    case SET_PROFILE_PHOTO:
      return {
        ...state,
        profile: {...state.profile!, photos: action.photos},
      }
    default:
      return state;
  }
};

type AddPostActionType = {
  type: typeof ADD_POST;
  newPost: string;
}

export const addPostActionCreator = (newPost: string): AddPostActionType => ({type: ADD_POST, newPost});

type DeletePostActionType = {
  type: typeof DELETE_POST;
  id: number;
}

export const deletePostActionCreator = (id: number): DeletePostActionType => ({type: DELETE_POST, id});

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type SetStatusActionType = {
  type: typeof SET_STATUS;
  status: string;
}

export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status});

type SetPhotosActionType = {
  type: typeof SET_PROFILE_PHOTO;
  photos: ProfilePhotosType;
}

export const setPhotos = (photos: ProfilePhotosType): SetPhotosActionType => ({type: SET_PROFILE_PHOTO, photos});

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

export const saveProfilePhotoThunkCreator = (photo: File) => async (dispatch: any) => {
  const data = await profileAPI.updatePhoto(photo);

  if (data.resultCode === 0) {
    dispatch(setPhotos(data.data.photos));
  }
};

export const saveProfileThunkCreator = (formData: any, setStatus: (status?: any) => void) => async (dispatch: any, getState: any) => {
  const data = await profileAPI.updateProfile(formData);

  if (data.resultCode === 0) {
    dispatch(getProfileThunkCreator(getState().auth.id));
  } else {
    const message = data.messages.length > 0 ? data.messages[0] : "Something went wrong";
    setStatus({error: message});
    return Promise.reject(message);
  }
};
