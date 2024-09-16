import {authAPI} from "../api/api.ts";

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
  id: null, // 2,
  email: null, // 'blabla@bla.bla',
  login: null, // 'samurai',
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

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
  type: SET_USER_DATA,
  payload: {id, email, login, isAuth},
});

export const getAuthThunkCreator = () => {
  return (dispatch: any) => {
    authAPI.me()
      .then((data) => {
        if (data.resultCode === 0) {
          const {id, email, login} = data.data;
          dispatch(setAuthUserData(id, email, login, true));
        }
      });
  }
};

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, setStatus: (status?: any) => void) => {
  return (dispatch: any) => {
    authAPI.login(email, password, rememberMe)
      .then((data) => {
        if (data.resultCode === 0) {
          dispatch(getAuthThunkCreator());
        } else {
          const message = data.messages.length > 0 ? data.messages[0] : "Something went wrong";
          setStatus({error: message});
        }
      });
  }
};

export const logoutThunkCreator = () => {
  return (dispatch: any) => {
    authAPI.logout()
      .then((data) => {
        if (data.resultCode === 0) {
          dispatch(setAuthUserData(null, null, null, false))
        }
      });
  }
};
