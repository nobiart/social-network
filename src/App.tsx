import './App.css';
import {Header} from "./components/header/Header.tsx";
import {NavBar} from "./components/navbar/NavBar.tsx";
import {Dialogs} from "./components/dialogs/Dialogs.tsx";
import {Route, Routes} from "react-router-dom";
import {Profile} from "./components/profile/Profile.tsx";
import {News} from "./components/news/News.tsx";
import {Music} from "./components/music/Music.tsx";
import {Settings} from "./components/settings/Settings.tsx";
import {IDialogItemProps} from "./components/dialogs/dialogItem/DialogItem.tsx";
import {IMessage} from "./components/dialogs/message/Message.tsx";
import {IPostProps} from "./components/profile/posts/post/Post.tsx";

// @TODO Why CSS doesn't work with "-", only camelCase

export interface IState {
  state: {
    profilePage: {
      posts: IPostProps[];
      newPostText: string;
    }
    dialogsPage: {
      dialogs: IDialogItemProps[];
      messages: IMessage[];
    }
  }
  addPost: () => void;
  updateNewPostText: (v: string) => void;
}

export const App = ({state, addPost, updateNewPostText}: IState) => {
  return (
    <div className="app-wrapper">
      <Header/>
      <NavBar/>
      <div className='app-content'>
        <Routes>
          <Route element={<Profile state={state.profilePage} addPost={addPost} updateNewPostText={updateNewPostText}/>}
                 path="/profile"/>
          <Route element={<Dialogs state={state.dialogsPage}/>} path="/dialogs/*"/>
          <Route element={<News/>} path="/news"/>
          <Route element={<Music/>} path="/music"/>
          <Route element={<Settings/>} path="/settings"/>
        </Routes>
      </div>
    </div>
  )
};
