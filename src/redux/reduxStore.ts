import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profileReducer.ts";
import {dialogsReducer} from "./dialogsReducer.ts";
import {sidebarReducer} from "./sidebarReducer.ts";

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
});

export const store = createStore(reducers);

window.store = store;
