import './App.css';
import {Header} from "./components/header/Header.tsx";
import {NavBar} from "./components/navbar/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import {Profile} from "./components/profile/Profile.tsx";
import {News} from "./components/news/News.tsx";
import {Music} from "./components/music/Music.tsx";
import {Settings} from "./components/settings/Settings.tsx";
import {DialogsContainer} from "./components/dialogs/DialogsContainer.tsx";

export const App = (state: any, store: any) => {
  console.log('Store: ', store);

  return (
    <div className="app-wrapper">
      <Header/>
      <NavBar/>
      <div className='app-content'>
        <Routes>
          <Route element={<Profile store={state.store}/>} path="/profile"/>
          <Route element={<DialogsContainer store={state.store}/>} path="/dialogs/*"/>
          <Route element={<News/>} path="/news"/>
          <Route element={<Music/>} path="/music"/>
          <Route element={<Settings/>} path="/settings"/>
        </Routes>
      </div>
    </div>
  )
};
