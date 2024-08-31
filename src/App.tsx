import './App.css';
import {Header} from "./components/header/Header.tsx";
import {NavBar} from "./components/navbar/NavBar.tsx";
import {Dialogs} from "./components/dialogs/Dialogs.tsx";
import {Route, Routes} from "react-router-dom";
import {Profile} from "./components/profile/Profile.tsx";
import {News} from "./components/news/News.tsx";
import {Music} from "./components/music/Music.tsx";
import {Settings} from "./components/settings/Settings.tsx";
import {IState} from "./redux/state.ts";

// @TODO Why CSS doesn't work with "-", only camelCase

export interface IAppState {
  state: IState;
  addPost: () => void;
  updateNewPostText: (v: string) => void;
}

export const App = ({state, addPost, updateNewPostText}: IAppState) => {
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
