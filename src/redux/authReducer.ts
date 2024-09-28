import {ResultCodesEnum} from "../api/api.ts";
import {authAPI} from "../api/authApi.ts";
import {securityAPI} from "../api/securityApi.ts";
import {BaseThunkType, InferActionsTypes} from "./reduxStore.ts";

const initialState = {
  id: null as (number | null),
  email: null as (string | null),
  login: null as (string | null),
  isAuth: false,
  captchaUrl: null as (string | null),
}

type AuthStateType = typeof initialState;
type AuthActionsType = InferActionsTypes<typeof authActions>;
type ThunkType = BaseThunkType<AuthActionsType>;

export const authReducer = (
  state = initialState,
  action: AuthActionsType
): AuthStateType => {
  switch (action.type) {
    case 'SN/AUTH/SET_USER_DATA':
      return {
        ...state,
        ...action.payload,
      };
    case 'SN/AUTH/SET_CAPTCHA_URL':
      return {
        ...state,
        captchaUrl: action.payload.captchaUrl,
      };
    default:
      return state;
  }
};

export const authActions = {
  setAuthUserData: (
    {id, email, login, isAuth}: AuthStateType) => (
    {
      type: 'SN/AUTH/SET_USER_DATA',
      payload: {id, email, login, isAuth},
    } as const),
  setCaptchaUrl: (url: string | null) => (
    {
      type: 'SN/AUTH/SET_CAPTCHA_URL',
      payload: {captchaUrl: url},
    }),
}

export const getAuthThunkCreator = (): ThunkType =>
  async (dispatch) => {
    const data = await authAPI.me();

    if (data.resultCode === ResultCodesEnum.SUCCESS) {
      const {id, email, login} = data.data;
      dispatch(authActions.setAuthUserData({id, email, login, isAuth: true, captchaUrl: null}));
    }
  };

export type AuthLoginRequestType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string | null,
  setStatus?: (status?: any) => void
}

export const loginThunkCreator = (
  {
    email,
    password,
    rememberMe,
    captcha,
    setStatus
  }: AuthLoginRequestType): ThunkType => async (dispatch) => {
  const data = await authAPI.login({email, password, rememberMe, captchaUrl: captcha});
  if (data.resultCode === ResultCodesEnum.SUCCESS) {
    dispatch(getAuthThunkCreator());
  } else {
    if (data.resultCode === ResultCodesEnum.CAPTCHA) {
      dispatch(getCaptchaUrlThunkCreator());
    }

    const message = data.messages.length > 0 ? data.messages[0] : "Something went wrong";
    setStatus && setStatus({error: message});
  }
};

export const getCaptchaUrlThunkCreator = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(authActions.setCaptchaUrl(captchaUrl));
}

export const logoutThunkCreator = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(authActions.setAuthUserData({id: null, email: null, login: null, isAuth: false, captchaUrl: null}));
  }
};
