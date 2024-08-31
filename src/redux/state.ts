import {IPostProps} from "../components/profile/posts/post/Post.tsx";
import {IDialogItemProps} from "../components/dialogs/dialogItem/DialogItem.tsx";
import {IMessage} from "../components/dialogs/message/Message.tsx";

export interface IState {
  profilePage: {
    posts: IPostProps[];
    newPostText: string;
  };
  dialogsPage: {
    dialogs: IDialogItemProps[];
    messages: IMessage[];
  }
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
      ]
    }
  },
  getState() {
    return this._state;
  },
  _callSubscriber(state: IState) {
    console.log('State changed', state);
  },
  addPost() {
    const newPost = {
      id: String(this._state.profilePage.posts.length + 2),
      message: this._state.profilePage.newPostText,
      likes: 0
    }

    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = '';
    this._callSubscriber(this._state);
  },
  updateNewPostText(newText: string) {
    this._state.profilePage.newPostText = newText;
    this._callSubscriber(this._state);
  },
  subscribe(observer: (state: IState) => void) {
    this._callSubscriber = observer;
  }
}

// window.store = store;
