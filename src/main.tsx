import {App} from "./App.tsx";
import ReactDOM from "react-dom/client";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import './index.css';
import {IState, store} from "./redux/state.ts";

const renderEntireTree = (state: IState) => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App state={state} addPost={store.addPost.bind(store)} updateNewPostText={store.updateNewPostText.bind(store)}/>
      </BrowserRouter>
    </React.StrictMode>,
  )
};

renderEntireTree(store.getState());

store.subscribe(renderEntireTree);
