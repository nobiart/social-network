import {Form, Formik} from "formik";
import {validateEmail, validatePassword} from "../../utils/validators.ts";
import {Input} from "../common/form/FormControl.tsx";

const LoginForm = () => {
  return (
    <Formik
      initialValues={{email: "", password: "", rememberMe: false}}
      onSubmit={(values, {setSubmitting}) => {
        console.log(values);
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

export const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm/>
    </div>
  );
};
