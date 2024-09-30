import React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {ReactReduxContextValue} from "react-redux";
import {Store, UnknownAction} from "redux";

// type InferProps<Component> = Component extends React.ComponentType<infer Props> ? Props : never;

// export function withRouter<P>(Component: React.ComponentType<P>) {
//   function ComponentWithRouterProp(props: InferProps<typeof Component>) {
//     let location = useLocation();
//     let navigate = useNavigate();
//     let params = useParams();
//     return (
//       <Component
//         {...props}
//         router={{location, navigate, params}}
//       />
//     );
//   }
//
//   return ComponentWithRouterProp;
// }

type AdditionalHOCType = {
  context?: React.Context<ReactReduxContextValue<any, UnknownAction> | null>;
  store?: Store;
}

export function withRouter<P extends AdditionalHOCType>(Component: React.ComponentType<P>) {
  return (props: P) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component {...props} router={{location, navigate, params}}/>
    );
  }
}
