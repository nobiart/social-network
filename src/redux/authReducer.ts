import {profileAPI} from "../api/api.ts";

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

const initialState = {
  id: null, // 2,
  email: null, // 'blabla@bla.bla',
  login: null, // 'samurai',
  isFetching: false,
  isAuth: false,
}

export const authReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: action.data.id != null,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    default:
      return state;
  }
};

export const setAuthUserData = (id: number, email: string, login: string) => ({
  type: SET_USER_DATA,
  data: {id, email, login}
});

export const toggleFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const getAuthThunkCreator = () => {
  return (dispatch: any) => {
    profileAPI.getAuth()
      .then((data) => {
        if (data.resultCode === 0) {
          const {id, email, login} = data.data;
          dispatch(setAuthUserData(id, email, login));
        }
      });
  }
};
