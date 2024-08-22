import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {App} from "./App.tsx";
import {BrowserRouter} from "react-router-dom";
import {state} from "./redux/state.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App state={state}/>
    </BrowserRouter>
  </React.StrictMode>,
)
