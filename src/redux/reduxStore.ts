import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./profileReducer.ts";
import {dialogsReducer} from "./dialogsReducer.ts";
import {sidebarReducer} from "./sidebarReducer.ts";
import {usersReducer} from "./usersReducer.ts";
import {authReducer} from "./authReducer.ts";
import {thunk as thunkMiddleware} from "redux-thunk";

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
