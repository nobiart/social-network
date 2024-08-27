import ReactDOM from "react-dom/client";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import './index.css';
import {App, IState} from "./App.tsx";

export const renderEntireTree = (state: IState) => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App state={state.state} addPost={state.addPost}/>
      </BrowserRouter>
    </React.StrictMode>,
  )
};
