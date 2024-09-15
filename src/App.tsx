import './App.css';
import {NavBar} from "./components/navbar/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import {News} from "./components/news/News.tsx";
import {Music} from "./components/music/Music.tsx";
import {Settings} from "./components/settings/Settings.tsx";
import {DialogsContainer} from "./components/dialogs/DialogsContainer.tsx";
import {UsersContainer} from "./components/users/UsersContainer.tsx";
import {ProfileContainer} from "./components/profile/ProfileContainer.tsx";
import {HeaderContainer} from "./components/header/HeaderContainer.tsx";
import {LoginContainer} from "./components/login/Login.tsx";

export const App = () => {
  return (
    <div className="app-wrapper">
      <HeaderContainer/>
      <NavBar/>
      <div className='app-content'>
        <Routes>
          <Route element={<ProfileContainer/>} path="/profile/:userId?"/>
          <Route element={<DialogsContainer/>} path="/dialogs/*"/>
          <Route element={<UsersContainer/>} path="/users"/>
          <Route element={<News/>} path="/news"/>
          <Route element={<Music/>} path="/music"/>
          <Route element={<Settings/>} path="/settings"/>
          <Route element={<LoginContainer/>} path="/login"/>
        </Routes>
      </div>
    </div>
  )
};
