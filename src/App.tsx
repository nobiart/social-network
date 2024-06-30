import './App.css';
import {Header} from "./components/Header.tsx";
import {NavBar} from "./components/NavBar.tsx";
import {Profile} from "./components/Profile.tsx";

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
