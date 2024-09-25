import {authAPI, securityAPI} from "../api/api.ts";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
}

export const authReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_DATA:
    case SET_CAPTCHA_URL:
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

export const setCaptchaUrl = (url: string) => ({
  type: SET_CAPTCHA_URL,
  payload: {captchaUrl: url},
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
  captcha: string | null,
  setStatus: (status?: any) => void
) => async (dispatch: any) => {
  const data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === 0) {
    dispatch(getAuthThunkCreator());
  } else {
    if (data.resultCode === 10) {
      dispatch(getCaptchaUrlThunkCreator());
    }

    const message = data.messages.length > 0 ? data.messages[0] : "Something went wrong";
    setStatus({error: message});
  }
};

export const getCaptchaUrlThunkCreator = () => async (dispatch: any) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(setCaptchaUrl(captchaUrl));
}

export const logoutThunkCreator = () => async (dispatch: any) => {
  const data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
};
