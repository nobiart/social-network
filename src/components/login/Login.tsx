import {Form, Formik} from "formik";
import {validateEmail, validatePassword} from "../../utils/validators.ts";
import {Input} from "../common/form/FormControl.tsx";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/authReducer.ts";
import {Navigate} from "react-router-dom";

const LoginForm = (props: any) => {
  return (
    <Formik
      initialValues={{email: "", password: "", rememberMe: false}}
      onSubmit={(values, {setSubmitting}) => {
        console.log(values);
        props.handleSubmit(values.email, values.password, values.rememberMe);
        setSubmitting(false);
      }}
    >
      {({values, isSubmitting, handleSubmit, handleChange}) => (
        <Form onSubmit={handleSubmit}>
          <div>
            <Input
              label="Email"
              type="text"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              validate={validateEmail}
            />
          </div>
          <div>
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              validate={validatePassword}
            />
          </div>
          <div>
            <Input
              label="Remember me"
              type="checkbox"
              name="rememberMe"
              checked={values.rememberMe}
              onChange={handleChange}
              // component={Input}
            />
          </div>
          <div>
            <button type="submit" disabled={isSubmitting}>Login</button>
          </div>
        </Form>
      )}
    </Formik>
  )
};

const Login = (props: any) => {
  if (props.isAuth) {
    return <Navigate to="/profile"/>
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm handleSubmit={props.loginThunkCreator}/>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isAuth: state.auth.isAuth,
})

export const LoginContainer = connect(mapStateToProps, {loginThunkCreator})(Login);
