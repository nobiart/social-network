import React from "react";
import {Header} from "./Header.tsx";
import {connect} from "react-redux";
import {getAuthThunkCreator, setAuthUserData} from "../../redux/authReducer.ts";

export class HeaderClass extends React.Component<any, any> {
  componentDidMount() {
    // this.props.getAuthThunkCreator();
    // this.props.setAuthUserData(31654, "dmitri.besleaga@internet.ru", "nobiart");
    this.props.setAuthUserData(undefined);
  }

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

export const HeaderContainer = connect(mapStateToProps, {setAuthUserData, getAuthThunkCreator})(HeaderClass)
