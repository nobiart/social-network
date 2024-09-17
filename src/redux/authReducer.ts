import {authAPI} from "../api/api.ts";

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
}

export const authReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
) => ({
  type: SET_USER_DATA,
  payload: {id, email, login, isAuth},
});

export const getAuthThunkCreator = () => {
  return async (dispatch: any) => {
    const data = await authAPI.me();
    if (data.resultCode === 0) {
      const {id, email, login} = data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  };
};

export const loginThunkCreator = (
  email: string,
  password: string,
  rememberMe: boolean,
  setStatus: (status?: any) => void
) => async (dispatch: any) => {
  const data = await authAPI.login(email, password, rememberMe);
  if (data.resultCode === 0) {
    dispatch(getAuthThunkCreator());
  } else {
    const message = data.messages.length > 0 ? data.messages[0] : "Something went wrong";
    setStatus({error: message});
  }
};

export const logoutThunkCreator = () => async (dispatch: any) => {
  const data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
};
