import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {App} from "./App.tsx";
import {BrowserRouter} from "react-router-dom";
import {IDialogItemProps} from "./components/dialogs/dialogItem/DialogItem.tsx";
import {IMessage} from "./components/dialogs/message/Message.tsx";
import {IPostProps} from "./components/profile/posts/post/Post.tsx";

const dialogs: IDialogItemProps[] = [
  {id: "1", name: "Ivan"},
  {id: "2", name: "Petya"},
  {id: "3", name: "Jora"},
];

const messages: IMessage[] = [
  {id: "1", text: "Message 1"},
  {id: "2", text: "Message 2"},
  {id: "3", text: "Message 3"},
];

const posts: IPostProps[] = [
  {id: "1", message: "Hi, how are you?", likes: 12},
  {id: "2", message: "It's OK, thanks!", likes: 1},
  {id: "3", message: "Thanks!", likes: 0},
  {id: "4", message: "My nth Post", likes: 5},
  {id: "5", message: "Hello, World!", likes: 8},
]

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App dialogs={dialogs} messages={messages} posts={posts}/>
    </BrowserRouter>
  </React.StrictMode>,
)
