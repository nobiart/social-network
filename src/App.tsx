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

export interface IAppProps {
  dialogs: IDialogItemProps[];
  messages: IMessage[];
  posts: IPostProps[];
}

export const App = ({dialogs, messages, posts}: IAppProps) => {
  return (
    <div className="app-wrapper">
      <Header/>
      <NavBar/>
      <div className='app-content'>
        <Routes>
          <Route element={<Profile posts={posts}/>} path="/profile"/>
          <Route element={<Dialogs dialogs={dialogs} messages={messages}/>} path="/dialogs/*"/>
          <Route element={<News/>} path="/news"/>
          <Route element={<Music/>} path="/music"/>
          <Route element={<Settings/>} path="/settings"/>
        </Routes>
      </div>
    </div>
  )
};
