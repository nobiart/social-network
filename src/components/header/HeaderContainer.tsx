import React from "react";
import {Header} from "./Header.tsx";
import {connect} from "react-redux";
import {logoutThunkCreator} from "../../redux/authReducer.ts";

export class HeaderClass extends React.Component<any, any> {
  render() {
    return <Header {...this.props} />
  }
}

const mapStateToProps = (state: any) => {
  return {
    login: state.auth.login,
    isAuth: state.auth.isAuth,
  }
}

export const HeaderContainer = connect(mapStateToProps, {logout: logoutThunkCreator})(HeaderClass)
