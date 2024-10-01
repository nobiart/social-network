import {useDispatch, useSelector} from "react-redux";
import {AuthActionsType, AuthLoginRequestType, loginThunkCreator} from "../../redux/authReducer.ts";
import {Navigate} from "react-router-dom";
import {AppDispatch, AppStateType} from "../../redux/reduxStore.ts";
import {LoginForm} from "./LoginForm.tsx";

export type SubmitLoginType = (data: AuthLoginRequestType) => void;

export const Login = () => {
  const dispatch: AppDispatch<AuthActionsType["type"]> = useDispatch();

  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

  const onSubmit = (formData: AuthLoginRequestType) => {
    dispatch(loginThunkCreator(formData)).then();
  }

  if (isAuth) {
    return <Navigate to="/profile"/>
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm handleSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
  );
};
