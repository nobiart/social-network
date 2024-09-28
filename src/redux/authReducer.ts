import {authAPI, ResultCodesEnum, securityAPI} from "../api/api.ts";

type AuthStateType = {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  captchaUrl: string | null;
}

const SET_USER_DATA = 'SN/AUTH/SET_USER_DATA';
const SET_CAPTCHA_URL = 'SN/AUTH/SET_CAPTCHA_URL';

const initialState: AuthStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
}

export const authReducer = (
  state = initialState,
  action: SetAuthUserDataActionType | SetCaptchaUrlActionType
): AuthStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case SET_CAPTCHA_URL:
      return {
        ...state,
        captchaUrl: action.payload.captchaUrl,
      };
    default:
      return state;
  }
};

type SetAuthUserDataActionPayloadType = {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
}

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataActionPayloadType;
}

export const setAuthUserData = (
  {id, email, login, isAuth}: SetAuthUserDataActionPayloadType): SetAuthUserDataActionType => (
  {
    type: SET_USER_DATA,
    payload: {id, email, login, isAuth},
  }
);

type SetCaptchaUrlActionType = {
  type: typeof SET_CAPTCHA_URL,
  payload: {
    captchaUrl: string | null;
  }
}

export const setCaptchaUrl = (url: string | null): SetCaptchaUrlActionType => ({
  type: SET_CAPTCHA_URL,
  payload: {captchaUrl: url},
});

export const getAuthThunkCreator = () =>
  async (dispatch: any) => {
    const data = await authAPI.me();

    if (data.resultCode === ResultCodesEnum.SUCCESS) {
      const {id, email, login} = data.data;
      dispatch(setAuthUserData({id, email, login, isAuth: true}));
    }
  };

export type AuthLoginActionType = {
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
  }: AuthLoginActionType) => async (dispatch: any) => {
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

export const getCaptchaUrlThunkCreator = () => async (dispatch: any) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(setCaptchaUrl(captchaUrl));
}

export const logoutThunkCreator = () => async (dispatch: any) => {
  const data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData({id: null, email: null, login: null, isAuth: false}))
  }
};
