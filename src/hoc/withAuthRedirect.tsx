import React from "react";
import {Navigate} from "react-router-dom";
import {connect, ReactReduxContextValue} from "react-redux";
import {AppStateType} from "../redux/reduxStore.ts";
import {Store, UnknownAction} from "redux";
import IntrinsicAttributes = React.JSX.IntrinsicAttributes;


type MapPropsType = {
  isAuth: boolean;
}

// type InferProps<Component> = Component extends React.ComponentType<infer Props> ? Props : never;

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth
});

type AdditionalHOCType = {
  context?: React.Context<ReactReduxContextValue<any, UnknownAction> | null>;
  store?: Store;
}

export function withAuthRedirect<P extends IntrinsicAttributes & AdditionalHOCType>(Component: React.ComponentType<P>) {
  const RedirectComponent = (props: P & MapPropsType) => {
    const {isAuth} = props;

    if (!isAuth) return <Navigate to="/login"/>

    return <Component {...props} />
  }

  // @ts-ignore
  return connect(mapStateToProps)(RedirectComponent);
}
