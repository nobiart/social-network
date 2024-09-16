import {getAuthThunkCreator} from "./authReducer.ts";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
  initialized: false,
};

export const appReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      }
    default:
      return state;
  }
};

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => {
  return (dispatch: any) => {
    const promise = dispatch(getAuthThunkCreator());
    promise.then(() => {
      dispatch(initializedSuccess());
    });
  }
};
