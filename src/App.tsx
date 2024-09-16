import './App.css';
import {NavBar} from "./components/navbar/NavBar.tsx";
import {Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import {News} from "./components/news/News.tsx";
import {Music} from "./components/music/Music.tsx";
import {Settings} from "./components/settings/Settings.tsx";
import {DialogsContainer} from "./components/dialogs/DialogsContainer.tsx";
import {UsersContainer} from "./components/users/UsersContainer.tsx";
import {ProfileContainer} from "./components/profile/ProfileContainer.tsx";
import {HeaderContainer} from "./components/header/HeaderContainer.tsx";
import {LoginContainer} from "./components/login/Login.tsx";
import {connect} from "react-redux";
import React from "react";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer.ts";
import {Preloader} from "./components/common/preloader/Preloader.tsx";

class AppClass extends React.Component<any, any> {
  componentDidMount() {
    this.props.initializeApp();
    // this.props.setAuthUserData(31654, "dmitri.besleaga@internet.ru", "nobiart");
    // this.props.setAuthUserData(1, "dmitri@internet.ru", "dada");
    // this.props.setAuthUserData(undefined);
  }

  render() {
    if (!this.props.initialized) return <Preloader/>

    return (
      <div className="app-wrapper">
        <HeaderContainer/>
        <NavBar/>
        <div className='app-content'>
          <Routes>
            <Route element={<ProfileContainer/>} path="/profile/:userId?"/>
            <Route element={<DialogsContainer/>} path="/dialogs/*"/>
            <Route element={<UsersContainer/>} path="/users"/>
            <Route element={<News/>} path="/news"/>
            <Route element={<Music/>} path="/music"/>
            <Route element={<Settings/>} path="/settings"/>
            <Route element={<LoginContainer/>} path="/login"/>
          </Routes>
        </div>
      </div>
    )
  }
}

function withRouter(AppClass: any) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <AppClass
        {...props}
        router={{location, navigate, params}}
      />
    );
  }

  return ComponentWithRouterProp;
}

const mapStateToProps = (state: any) => ({
  initialized: state.app.initialized,
})

export const App = compose(
  connect(mapStateToProps, {initializeApp}),
  withRouter,
)(AppClass);
