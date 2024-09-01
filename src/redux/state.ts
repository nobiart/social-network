import {IPostProps} from "../components/profile/posts/post/Post.tsx";
import {IDialogItemProps} from "../components/dialogs/dialogItem/DialogItem.tsx";
import {IMessage} from "../components/dialogs/message/Message.tsx";
import {profileReducer} from "./profileReducer.ts";
import {dialogsReducer} from "./dialogsReducer.ts";
import {sidebarReducer} from "./sidebarReducer.ts";

export interface IState {
  profilePage: {
    posts: IPostProps[];
    newPostText: string;
  };
  dialogsPage: {
    dialogs: IDialogItemProps[];
    messages: IMessage[];
    newMessageBody: string;
  },
  sidebar: {};
}

export const store = {
  _state: {
    profilePage: {
      posts: [
        {id: "1", message: "Hi, how are you?", likes: 12},
        {id: "2", message: "It's OK, thanks!", likes: 1},
        {id: "3", message: "Thanks!", likes: 0},
        {id: "4", message: "My nth Post", likes: 5},
        {id: "5", message: "Hello, World!", likes: 8},
      ],
      newPostText: "",
    },
    dialogsPage: {
      dialogs: [
        {id: "1", name: "Ivan"},
        {id: "2", name: "Petya"},
        {id: "3", name: "Jora"},
      ],
      messages: [
        {id: "1", text: "Message 1"},
        {id: "2", text: "Message 2"},
        {id: "3", text: "Message 3"},
      ],
      newMessageBody: '',
    },
    sidebar: {},
  },
  _callSubscriber(state: IState) {
    console.log('State changed', state);
  },

  getState() {
    return this._state;
  },
  subscribe(observer: (state: IState) => void) {
    this._callSubscriber = observer;
  },

  dispatch(action: any) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  },
}

// window.store = store;
