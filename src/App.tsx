import './App.css';
import {Header} from "./components/header/Header.tsx";
import {NavBar} from "./components/navbar/NavBar.tsx";
import {Dialogs} from "./components/dialogs/Dialogs.tsx";
import {Route, Routes} from "react-router-dom";
import {Profile} from "./components/profile/Profile.tsx";
import {News} from "./components/news/News.tsx";
import {Music} from "./components/music/Music.tsx";
import {Settings} from "./components/settings/Settings.tsx";

// @TODO Why CSS doesn't work with "-", only camelCase

export interface IAppState {
  state: any;
  dispatch: (action: any) => void;
}

export const App = ({state, dispatch}: IAppState) => {
  return (
    <div className="app-wrapper">
      <Header/>
      <NavBar/>
      <div className='app-content'>
        <Routes>
          <Route element={<Profile state={state.profilePage} dispatch={dispatch}/>}
                 path="/profile"/>
          <Route element={<Dialogs state={state.dialogsPage} dispatch={dispatch}/>} path="/dialogs/*"/>
          <Route element={<News/>} path="/news"/>
          <Route element={<Music/>} path="/music"/>
          <Route element={<Settings/>} path="/settings"/>
        </Routes>
      </div>
    </div>
  )
};
