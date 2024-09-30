import React, {Suspense} from "react";
import {Preloader} from "../components/common/preloader/Preloader.tsx";
import {ReactReduxContextValue} from "react-redux";
import {Store, UnknownAction} from "redux";
import IntrinsicAttributes = React.JSX.IntrinsicAttributes;

type AdditionalHOCType = {
  context?: React.Context<ReactReduxContextValue<any, UnknownAction> | null>;
  store?: Store;
}

export function withSuspense<P extends IntrinsicAttributes & AdditionalHOCType>(Component: React.ComponentType<P>) {
  return (props: P) => {
    return (
      <Suspense fallback={<Preloader/>}>
        <Component {...props} />
      </Suspense>
    )
  }
}
