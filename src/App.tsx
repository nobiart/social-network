import './App.css';
import {Header} from "./components/header/Header.tsx";
import {NavBar} from "./components/navbar/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import {News} from "./components/news/News.tsx";
import {Music} from "./components/music/Music.tsx";
import {Settings} from "./components/settings/Settings.tsx";
import {DialogsContainer} from "./components/dialogs/DialogsContainer.tsx";
import {UsersContainer} from "./components/users/UsersContainer.tsx";
import {ProfileContainer} from "./components/profile/ProfileContainer.tsx";

export const App = () => {
  return (
    <div className="app-wrapper">
      <Header/>
      <NavBar/>
      <div className='app-content'>
        <Routes>
          <Route element={<ProfileContainer/>} path="/profile/*"/>
          <Route element={<DialogsContainer/>} path="/dialogs/*"/>
          <Route element={<UsersContainer/>} path="/users"/>
          <Route element={<News/>} path="/news"/>
          <Route element={<Music/>} path="/music"/>
          <Route element={<Settings/>} path="/settings"/>
        </Routes>
      </div>
    </div>
  )
};
