import s from "./FormControl.module.css";
import {useField} from "formik";

// @ts-ignore
export const TextArea = ({label, ...props}) => {
  // @ts-ignore
  const [field, meta] = useField(props);
  const hasErrors = meta.touched && meta.error;

  return (
    <div className={s.formControl + " " + (hasErrors ? s.error : "")}>
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <textarea {...field} {...props} />
      </div>
      {hasErrors ? (
        <span className={s.error}>{meta.error}</span>
      ) : null}
    </div>
  )
};

// @ts-ignore
export const Input = ({label, ...props}) => {
  // @ts-ignore
  const [field, meta] = useField(props);
  const hasErrors = meta.touched && meta.error;

  return (
    <div className={s.formControl + " " + (hasErrors ? s.error : "")}>
      <div>
        {props.type !== "checkbox" && (
          <label htmlFor={props.id || props.name}>{label}</label>
        )}
        <input {...field} {...props} />
        {props.type === "checkbox" && (
          <label htmlFor={props.id || props.name}>{label}</label>
        )}
      </div>
      {hasErrors ? (
        <span className={s.error}>{meta.error}</span>
      ) : null}
    </div>
  )
};
