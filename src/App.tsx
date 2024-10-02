import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {initializeApp} from "./redux/appReducer.ts";
import {Preloader} from "./components/common/preloader/Preloader.tsx";
import {AppDispatch, AppStateType, store} from "./redux/reduxStore.ts";
import {Breadcrumb, Layout, theme} from 'antd';
import {withSuspense} from "./hoc/withSuspense.tsx";
import {UsersPage} from "./components/users/UsersPage.tsx";
import {News} from "./components/news/News.tsx";
import {Music} from "./components/music/Music.tsx";
import {Settings} from "./components/settings/Settings.tsx";
import {Login} from "./components/login/Login.tsx";
import {AuthActionsType} from "./redux/authReducer.ts";
import {Header} from "./components/header/Header.tsx";
import {NavBar} from "./components/navbar/NavBar.tsx";

const {Content, Footer} = Layout;

const Dialogs = React.lazy(() => import("./components/dialogs/Dialogs")
  .then(module => ({
      default: module.Dialogs
    })
  )
);

const ProfileContainer = React.lazy(() => import("./components/profile/ProfileContainer")
  .then(module => ({
    default: module.ProfileContainer
  }))
);

const App = () => {
  const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();
  const dispatch: AppDispatch<AuthActionsType["type"]> = useDispatch();
  const initialized = useSelector((state: AppStateType) => state.app.initialized);

  const catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
    alert("Some error");
    console.log(promiseRejectionEvent);
  }

  useEffect(() => {
    if (!initialized) dispatch(initializeApp());
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors);

    return () => {
      window.removeEventListener("unhandledrejection", catchAllUnhandledErrors);
    }
  }, []);

  if (!initialized) return <Preloader/>;

  return (
    <Layout>
      <Header/>
      <Content style={{padding: '0 48px'}}>
        <Breadcrumb style={{margin: '16px 0'}}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG}}
        >
          <NavBar/>
          <Content style={{padding: '0 24px', minHeight: 280}}>
            <Routes>
              <Route Component={withSuspense(ProfileContainer)} path="/"/>
              <Route Component={withSuspense(ProfileContainer)} path="/profile/:userId?"/>
              <Route Component={withSuspense(Dialogs)} path="/dialogs/*"/>
              <Route element={<UsersPage pageTitle="Самураи"/>} path="/users"/>
              <Route element={<News/>} path="/news"/>
              <Route element={<Music/>} path="/music"/>
              <Route element={<Settings/>} path="/settings"/>
              <Route element={<Login/>} path="/login"/>
              <Route element={<div>404 NOT FOUND</div>} path="*"/>
            </Routes>
          </Content>
        </Layout>
      </Content>
      <Footer style={{textAlign: 'center'}}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  )
};

export const MainApp = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  )
};
