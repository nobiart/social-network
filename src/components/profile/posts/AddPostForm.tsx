import {maxLengthCreator} from "../../../utils/validators.ts";
import {Field, FieldProps, Form, Formik} from "formik";
import {Button, Input, Typography} from "antd";

const {TextArea} = Input;
const {Text} = Typography;

type AddPostFormType = {
  onSubmit: (text: string) => void,
}

export const AddPostForm = ({onSubmit}: AddPostFormType) => {
  const maxLength = maxLengthCreator(10);

  return (
    <Formik
      initialValues={{newPost: ""}}
      onSubmit={(values, {setSubmitting}) => {
        onSubmit(values.newPost);
        setSubmitting(false);
        values.newPost = "";
      }}
    >
      {({isSubmitting, status}) => (
        <Form>
          <Field name="newPost" validate={maxLength}>
            {({field, meta}: FieldProps) => (
              <>
                <TextArea status={status?.error ? "error" : ""} {...field}/>
                {meta.touched && meta.error && (
                  <Text type="danger">{meta.error}</Text>
                )}
              </>
            )}
          </Field>
          <Text type="danger">{status?.error}</Text>
          <Button disabled={isSubmitting}>Add New Post</Button>
        </Form>
      )}
    </Formik>
  )
};
