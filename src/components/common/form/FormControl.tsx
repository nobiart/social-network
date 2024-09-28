import s from "./FormControl.module.css";
import {Field, FieldHookConfig, useField} from "formik";

type FormControlType = FieldHookConfig<{} & string> & {
  label?: string,
  type: string,
  placeholder?: string,
  validate?: (v: string) => void,
}

// @TODO Clarify types later in lesson 13

export const TextArea = ({...props}: FormControlType) => {
  const [field, meta] = useField(props);
  const hasErrors = meta.touched && meta.error;

  return (
    <Field validate={props.validate}>
      {({...props}) => (
        <div className={s.formControl + " " + (hasErrors ? s.error : "")}>
          {props.label && <label htmlFor={props.id || props.name}>{props.label}</label>}
          <textarea {...field} {...props} />
          {hasErrors ? (
            <div className={s.error}>{meta.error}</div>
          ) : null}
        </div>
      )}
    </Field>
  )
};

export const Input = ({...props}: FormControlType) => {
  const [field, meta] = useField(props);
  const hasErrors = meta.touched && meta.error;

  return (
    <Field validate={props.validate}>
      {({...props}) => (
        <div className={s.formControl + " " + (hasErrors ? s.error : "")}>
          {(props.label && props.type !== "checkbox") && (
            <label htmlFor={props.id || props.name}>{props.label}</label>
          )}
          <input type={props.type} {...field} {...props} />
          {(props.label && props.type === "checkbox") && (
            <label htmlFor={props.id || props.name}>{props.label}</label>
          )}
          {hasErrors ? (
            <div className={s.error}>{meta.error}</div>
          ) : null}
        </div>
      )}
    </Field>
  )
};
