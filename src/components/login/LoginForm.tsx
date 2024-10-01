import {AuthLoginRequestType} from "../../redux/authReducer.ts";
import {Field, FieldProps, Form, Formik} from "formik";
import {validateEmail, validatePassword} from "../../utils/validators.ts";
import s from "../common/form/FormControl.module.css";
import {SubmitLoginType} from "./Login.tsx";


type LoginFormPropsTypes = {
  handleSubmit: SubmitLoginType;
  captchaUrl: string | null;
}

export const LoginForm = ({handleSubmit, captchaUrl}: LoginFormPropsTypes) => {
  const initialValues: AuthLoginRequestType = {email: "", password: "", rememberMe: false, captcha: null};

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