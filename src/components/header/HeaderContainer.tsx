import React from "react";
import {Header} from "./Header.tsx";
// import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/authReducer.ts";

export class HeaderClass extends React.Component<any, any> {
  componentDidMount() {
    // axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {withCredentials: true})
    //   .then(res => {
    //     if (res.data.resultCode === 0) {
    //       const {id, email, login} = res.data.data;
    //       this.props.setAuthUserData(id, email, login);
    //     }
    //   });
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

export const HeaderContainer = connect(mapStateToProps, {setAuthUserData})(HeaderClass)
