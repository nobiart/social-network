import {getAuthThunkCreator} from "./authReducer.ts";

type AppStateType = {
  initialized: boolean;
}

const INITIALIZED_SUCCESS = 'SN/APP/INITIALIZED_SUCCESS';

const initialState: AppStateType = {
  initialized: false,
};

export const appReducer = (state = initialState, action: AppActionType): AppStateType => {
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

type AppActionType = {
  type: typeof INITIALIZED_SUCCESS;
}

export const initializedSuccess = (): AppActionType => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => {
  return (dispatch: any) => {
    const promise = dispatch(getAuthThunkCreator());
    promise.then(() => {
      dispatch(initializedSuccess());
    });
  }
};
