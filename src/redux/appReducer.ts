import {getAuthThunkCreator} from "./authReducer.ts";
import {BaseThunkType, InferActionsTypes} from "./reduxStore.ts";

const initialState = {
  initialized: false,
};

export type MainAppStateType = typeof initialState;
type AppActionType = InferActionsTypes<typeof appActions>;

export const appReducer = (state = initialState, action: AppActionType): MainAppStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true,
      }
    default:
      return state;
  }
};

const appActions = {
  initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const),
}

export const initializeApp = (): BaseThunkType<AppActionType, void> => (
  (dispatch) => {
    const promise = dispatch(getAuthThunkCreator());
    promise.then(() => {
      dispatch(appActions.initializedSuccess());
    });
  }
);
