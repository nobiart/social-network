import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = (state: any) => ({
  isAuth: state.auth.isAuth
});

export const withAuthRedirect = (Component: any) => {
  class RedirectComponent extends React.Component<any, any> {
    render() {
      if (!this.props.isAuth) return <Navigate to="/login"/>

      return <Component {...this.props} />
    }
  }

  return connect(mapStateToProps)(RedirectComponent);
};
