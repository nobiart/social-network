import {ProfilePhotosType} from "./types.ts";
import {profileAPI} from "../api/profileApi.ts";
import {BaseThunkType, InferActionsTypes} from "./reduxStore.ts";

// type PostItemType = {
//   id: number;
//   message: string;
//   likes: number;
// }

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

export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ProfileContactsType;
  photos: ProfilePhotosType;
}

// export type ProfileStateType = {
//   posts: PostItemType[] | null;
//   profile: ProfileType | null;
//   status: string | null;
//   profilePhoto: File | null;
// }

const initialState = {
  posts: [
    {id: 1, message: "Hi, how are you?", likes: 12},
    {id: 2, message: "It's OK, thanks!", likes: 1},
    {id: 3, message: "Thanks!", likes: 0},
    {id: 4, message: "My nth Post", likes: 5},
    {id: 5, message: "Hello, World!", likes: 8},
  ],
  profile: null as (ProfileType | null),
  status: "",
  profilePhoto: null as (File | null),
};

export type ProfileStateType = typeof initialState;
type ProfileActionsType = InferActionsTypes<typeof profileActions>;
type ThunkType = BaseThunkType<ProfileActionsType>;

export const profileReducer = (state = initialState, action: ProfileActionsType): ProfileStateType => {
  switch (action.type) {
    case 'SN/PROFILE/ADD_POST': {
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
    case 'SN/PROFILE/DELETE_POST': {
      return {
        ...state,
        posts: (state.posts ?? []).filter((post) => post.id !== action.id)
      }
    }
    case "SN/PROFILE/SET_USER_PROFILE":
      return {
        ...state,
        profile: action.profile,
      }
    case "SN/PROFILE/SET_STATUS":
      return {
        ...state,
        status: action.status,
      }
    case "SN/PROFILE/SET_PROFILE_PHOTO":
      return {
        ...state,
        profile: {...state.profile!, photos: action.photos},
      }
    default:
      return state;
  }
};

export const profileActions = {
  addPostActionCreator: (newPost: string) => ({type: 'SN/PROFILE/ADD_POST', newPost} as const),
  deletePostActionCreator: (id: number) => ({type: 'SN/PROFILE/DELETE_POST', id} as const),
  setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
  setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
  setPhotos: (photos: ProfilePhotosType) => ({type: 'SN/PROFILE/SET_PROFILE_PHOTO', photos} as const),
}

export const getProfileThunkCreator = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(profileActions.setUserProfile(data));
};

export const getStatusThunkCreator = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(profileActions.setStatus(data));
};

export const updateStatusThunkCreator = (text: string): ThunkType => async (dispatch) => {
  const data = await profileAPI.updateStatus(text);

  if (data.resultCode === 0) {
    dispatch(profileActions.setStatus(text));
  }
};

export const saveProfilePhotoThunkCreator = (photo: File): ThunkType => async (dispatch) => {
  const data = await profileAPI.updatePhoto(photo);

  if (data.resultCode === 0) {
    dispatch(profileActions.setPhotos(data.data.photos));
  }
};

export const saveProfileThunkCreator = (
  profile: ProfileType, setStatus: (status?: { error: string }
  ) => void): ThunkType =>
  async (dispatch, getState) => {
    const data = await profileAPI.updateProfile(profile);
    const userId = getState().auth.id;

    if (data.resultCode === 0) {
      if (userId !== null) {
        dispatch(getProfileThunkCreator(userId));
      } else {
        throw new Error("userId can't be null!");
      }
    } else {
      const message = data.messages.length > 0 ? data.messages[0] : "Something went wrong";
      setStatus({error: message});
      return Promise.reject(message);
    }
  };
