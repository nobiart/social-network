import './App.css';
import {Header} from "./components/header/Header.tsx";
import {NavBar} from "./components/navbar/NavBar.tsx";
import {Profile} from "./components/profile/Profile.tsx";

// @TODO Why CSS doesn't work with "-", only camelCase

export const App = () => {
  return (
    <div className="app-wrapper">
      <Header/>
      <NavBar/>
      <Profile/>
    </div>
  )
};
