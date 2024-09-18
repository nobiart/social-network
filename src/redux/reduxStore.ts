import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {profileReducer} from "./profileReducer.ts";
import {dialogsReducer} from "./dialogsReducer.ts";
import {sidebarReducer} from "./sidebarReducer.ts";
import {usersReducer} from "./usersReducer.ts";
import {authReducer} from "./authReducer.ts";
import {thunk as thunkMiddleware} from "redux-thunk";
import {appReducer} from "./appReducer.ts";

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.store = store;
