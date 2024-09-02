import {App} from "./App.tsx";
import ReactDOM from "react-dom/client";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import './index.css';
import {store} from "./redux/reduxStore.ts";

const renderEntireTree = (state: any) => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App state={state} store={store}/>
      </BrowserRouter>
    </React.StrictMode>,
  )
};

renderEntireTree(store.getState());

store.subscribe(() => {
  renderEntireTree(store.getState());
});
