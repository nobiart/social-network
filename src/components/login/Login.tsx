import {ErrorMessage, Field, Form, Formik} from "formik";

const LoginForm = () => {
  return (
    <Formik
      initialValues={{login: "", password: "", rememberMe: false}}
      onSubmit={(values, {setSubmitting}) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({values, isSubmitting, handleSubmit, handleChange}) => (
        <Form onSubmit={handleSubmit}>
          <div>
            <Field
              type="text"
              name="login"
              placeholder="Login"
              value={values.login}
              onChange={handleChange}
            />
            <ErrorMessage name="login" component="div"/>
          </div>
          <div>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />
            <ErrorMessage name="password" component="div"/>
          </div>
          <div>
            <Field
              type="checkbox"
              name="rememberMe"
              checked={values.rememberMe}
              onChange={handleChange}
            />
            <span>Remember me</span>
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
