import {Form, Formik} from "formik";
import {validateEmail, validatePassword} from "../../utils/validators.ts";
import {Input} from "../common/form/FormControl.tsx";
import {connect} from "react-redux";
import {AuthLoginActionType, loginThunkCreator} from "../../redux/authReducer.ts";
import {Navigate} from "react-router-dom";

interface ILoginFormProps {
  handleSubmit: SubmitLoginType;
  captchaUrl: string | null;
}

type SubmitLoginType = ({email, password, rememberMe, captcha, setStatus}: AuthLoginActionType) => void;

const LoginForm = ({handleSubmit, captchaUrl}: ILoginFormProps) => {
  return (
    <Formik
      initialValues={{email: "", password: "", rememberMe: false, captcha: null}}
      onSubmit={(values, {setSubmitting, setStatus}) => {
        console.log(values);
        handleSubmit({
          email: values.email,
          password: values.password,
          rememberMe: values.rememberMe,
          captcha: values.captcha,
          setStatus,
        });
        setSubmitting(false);
      }}
    >
      {({values, isSubmitting, handleSubmit, handleChange, status}) => (
        <Form onSubmit={handleSubmit}>
          <div>{status?.error}</div>
          <Input
            label="Email"
            type="text"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            validate={validateEmail}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            validate={validatePassword}
          />
          <Input
            label="Remember me"
            type="checkbox"
            name="rememberMe"
            checked={values.rememberMe}
            onChange={handleChange}
          />
          {captchaUrl && (
            <>
              <div><img src={captchaUrl} alt="Captcha"/></div>
              <Input
                label="Enter captcha"
                type="text"
                name="captcha"
                value={values.captcha}
                onChange={handleChange}
              />
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

interface ILoginProps {
  isAuth: boolean;
  captchaUrl: string | null;
  loginThunkCreator: SubmitLoginType;
}

const Login = ({isAuth, captchaUrl, loginThunkCreator}: ILoginProps) => {
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

const mapStateToProps = (state: any) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
})

export const LoginContainer = connect(mapStateToProps, {loginThunkCreator})(Login);
