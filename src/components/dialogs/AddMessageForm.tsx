import {Field, Form, Formik} from "formik";

type AddMessageFormType = {
  sendMessage: (text: string) => void;
}

export const AddMessageForm = ({sendMessage}: AddMessageFormType) => {
  return (
    <Formik
      initialValues={{messageText: ""}}
      onSubmit={(values, {setSubmitting}) => {
        sendMessage(values.messageText);
        setSubmitting(false);
        values.messageText = "";
      }}
    >
      {({values, handleSubmit, handleChange, isSubmitting}) => (
        <Form onSubmit={handleSubmit}>
          <Field
            type="textarea"
            name="messageText"
            value={values.messageText}
            onChange={handleChange}
            placeholder="Enter your message"
          />
          <div>
            <button type="submit" disabled={isSubmitting}>Send</button>
          </div>
        </Form>
      )}
    </Formik>
  )
};
