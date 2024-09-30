import './App.css';
import {NavBar} from "./components/navbar/NavBar.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {News} from "./components/news/News.tsx";
import {Music} from "./components/music/Music.tsx";
import {Settings} from "./components/settings/Settings.tsx";
import {UsersContainer} from "./components/users/UsersContainer.tsx";
import {HeaderContainer} from "./components/header/HeaderContainer.tsx";
import {LoginContainer} from "./components/login/Login.tsx";
import {connect, Provider} from "react-redux";
import React from "react";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer.ts";
import {Preloader} from "./components/common/preloader/Preloader.tsx";
import {AppStateType, store} from "./redux/reduxStore.ts";
import {withSuspense} from "./hoc/withSuspense.tsx";
import {withRouter} from "./hoc/withRouter.tsx";


const DialogsContainer = React.lazy(() => import("./components/dialogs/DialogsContainer")
  .then(module => ({
      default: module.DialogsContainer
    })
  )
);

const ProfileContainer = React.lazy(() => import("./components/profile/ProfileContainer")
  .then(module => ({
    default: module.ProfileContainer
  }))
);

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void
};

class AppClass extends React.Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
    alert("Some error");
    console.log(promiseRejectionEvent);
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) return <Preloader/>

    return (
      <div className="app-wrapper">
        <HeaderContainer/>
        <NavBar/>
        <div className='app-content'>
          <Routes>
            <Route Component={withSuspense(ProfileContainer)} path="/"/>
            <Route Component={withSuspense(ProfileContainer)} path="/profile/:userId?"/>
            <Route Component={withSuspense(DialogsContainer)} path="/dialogs/*"/>
            <Route element={<UsersContainer/>} path="/users"/>
            <Route element={<News/>} path="/news"/>
            <Route element={<Music/>} path="/music"/>
            <Route element={<Settings/>} path="/settings"/>
            <Route element={<LoginContainer/>} path="/login"/>
            <Route element={<div>404 NOT FOUND</div>} path="*"/>
          </Routes>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
})

const AppContainer = compose<React.ComponentType>(
  connect(mapStateToProps, {initializeApp}),
  withRouter,
)(AppClass);

export const MainApp = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <AppContainer/>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  )
};
