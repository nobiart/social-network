import {addPost, state, subscribe, updateNewPostText} from "./redux/state.ts";
import {App, IState} from "./App.tsx";
import ReactDOM from "react-dom/client";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import './index.css';

const renderEntireTree = (state: IState) => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App state={state.state} addPost={state.addPost} updateNewPostText={state.updateNewPostText}/>
      </BrowserRouter>
    </React.StrictMode>,
  )
};

renderEntireTree({state, addPost, updateNewPostText});

subscribe(renderEntireTree);
