import {Field, FieldProps, Form, Formik} from "formik";
import {FormSubmitStatusType, ProfileType} from "../../../redux/profileReducer.ts";
import s from "../../common/form/FormControl.module.css";

export type ProfileDataFormProps = {
  profile: ProfileType,
  handleSubmit: (profile: ProfileType, setStatus: FormSubmitStatusType) => void;
}

export const ProfileDataForm = ({profile, handleSubmit}: ProfileDataFormProps) => {
  return (
    <Formik
      initialValues={profile}
      onSubmit={(values, {setSubmitting, setStatus}) => {
        handleSubmit(values, setStatus);
        setSubmitting(false);
      }}
    >
      {({isSubmitting, status}) => (
        <Form>
          <Field name="fullName">
            {({field, meta}: FieldProps) => (
              <div className={s.formControl}>
                <label htmlFor={field.name}>Full Name</label>
                <input type="text" placeholder="Full Name" {...field} />
                {meta.touched && meta.error && (
                  <div className={s.error}>{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="lookingForAJob">
            {({field, meta}: FieldProps) => (
              <div className={s.formControl}>
                <label htmlFor={field.name}>Looking For A Job</label>
                <input type="checkbox" {...field} />
                {meta.touched && meta.error && (
                  <div className={s.error}>{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="lookingForAJobDescription">
            {({field, meta}: FieldProps) => (
              <div className={s.formControl}>
                <label htmlFor={field.name}>Job Description</label>
                <textarea placeholder="Job Description" {...field} />
                {meta.touched && meta.error && (
                  <div className={s.error}>{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          {Object.keys(profile.contacts ?? {}).map(key => {
            return (
              <Field name={`contacts.${key}`} key={key}>
                {({field, meta}: FieldProps) => (
                  <div className={s.formControl}>
                    <label htmlFor={field.name}>{key}</label>
                    <input type="text" placeholder={key} {...field} />
                    {meta.touched && meta.error && (
                      <div className={s.error}>{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            )
          })}
          <div>{status?.error}</div>
          <div>
            <button type="submit" disabled={isSubmitting}>Save</button>
          </div>
        </Form>
      )}
    </Formik>
  )
};
