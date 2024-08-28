import {IState} from "../App.tsx";

let renderEntireTree = (state: IState) => {
  console.log('State changed', state);
}

export const state = {
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
};

export const addPost = () => {
  const newPost = {
    id: String(state.profilePage.posts.length + 2),
    message: state.profilePage.newPostText,
    likes: 0
  }

  state.profilePage.posts.push(newPost);
  state.profilePage.newPostText = '';
  renderEntireTree({state, addPost, updateNewPostText});
}

export const updateNewPostText = (newText: string) => {
  state.profilePage.newPostText = newText;

  renderEntireTree({state, addPost, updateNewPostText});
}

export const subscribe = (observer: (state: IState) => void) => {
  renderEntireTree = observer;
}
