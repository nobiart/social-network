import {Field, FieldProps, Form, Formik} from "formik";
import {validateEmail, validatePassword} from "../../utils/validators.ts";
import {connect} from "react-redux";
import {AuthLoginActionType, loginThunkCreator} from "../../redux/authReducer.ts";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../../redux/reduxStore.ts";
import s from "../common/form/FormControl.module.css";

type SubmitLoginType = (data: AuthLoginActionType) => void;

type LoginFormPropsTypes = {
  handleSubmit: SubmitLoginType;
  captchaUrl: string | null;
}

// type LoginFormValuesType = {
//   email: string,
//   password: string,
//   rememberMe: boolean,
//   captcha: string | null,
// }

type MapStatePropsType = {
  isAuth: boolean,
  captchaUrl: string | null,
}

type MapDispatchPropsType = {
  loginThunkCreator: SubmitLoginType;
}

const LoginForm = ({handleSubmit, captchaUrl}: LoginFormPropsTypes) => {
  const initialValues: AuthLoginActionType = {email: "", password: "", rememberMe: false, captcha: null};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, {setSubmitting, setStatus}) => {
        handleSubmit({
          ...values,
          setStatus,
        });
        setSubmitting(false);
      }}
    >
      {({isSubmitting, status}) => (
        <Form>
          <div>{status?.error}</div>
          <Field name="email" validate={validateEmail}>
            {({field, meta}: FieldProps) => (
              <div className={s.formControl}>
                <label htmlFor={field.name}>Email</label>
                <input type="email" placeholder="Email" {...field} />
                {meta.touched && meta.error && (
                  <div className={s.error}>{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="password" validate={validatePassword}>
            {({field, meta}: FieldProps) => (
              <div className={s.formControl}>
                <label htmlFor={field.name}>Password</label>
                <input type="password" placeholder="Password" {...field} />
                {meta.touched && meta.error && (
                  <div className={s.error}>{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="rememberMe">
            {({field}: FieldProps) => (
              <div className={s.formControl}>
                <label htmlFor={field.name}>Remember</label>
                <input type="checkbox" {...field} />
              </div>
            )}
          </Field>
          {captchaUrl && (
            <>
              <div><img src={captchaUrl} alt="Captcha"/></div>
              <Field name="captcha">
                {({field, meta}: FieldProps) => (
                  <div className={s.formControl}>
                    <label htmlFor={field.name}>Captcha</label>
                    <input type="text" placeholder="Captcha" {...field} />
                    {meta.touched && meta.error && (
                      <div className={s.error}>{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </>
          )}
          <div>
            <button type="submit" disabled={isSubmitting}>Login</button>
          </div>
        </Form>
      )}
    </Formik>
  )
};

type LoginPropsType = MapStatePropsType & MapDispatchPropsType;

const Login = ({isAuth, captchaUrl, loginThunkCreator}: LoginPropsType) => {
  if (isAuth) {
    return <Navigate to="/profile"/>
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm handleSubmit={loginThunkCreator} captchaUrl={captchaUrl}/>
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
})

export const LoginContainer =
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {loginThunkCreator})(Login);
