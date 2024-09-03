import {App} from "./App.tsx";
import ReactDOM from "react-dom/client";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import './index.css';
import {store} from "./redux/reduxStore.ts";
import {Provider} from "react-redux";

const renderEntireTree = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
  )
};

renderEntireTree();

store.subscribe(() => {
  renderEntireTree();
});
