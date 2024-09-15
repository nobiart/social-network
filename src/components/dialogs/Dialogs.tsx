import s from './Dialogs.module.css';
import {DialogItem} from "./dialogItem/DialogItem.tsx";
import {Message} from "./message/Message.tsx";
import {Field, Form, Formik} from "formik";

const AddMessageForm = (props: any) => {
  return (
    <Formik
      initialValues={{messageText: ""}}
      onSubmit={(values, {setSubmitting}) => {
        console.log(values);
        props.onSubmit(values.messageText);
        setSubmitting(false);
        values.messageText = "";
      }}
    >
      {({values, handleSubmit, handleChange}) => (
        <Form onSubmit={handleSubmit}>
          <div>
            <Field
              type="textarea"
              name="messageText"
              value={values.messageText}
              onChange={handleChange}
              placeholder="Enter your message"
            />
          </div>
          <button type="submit">Send</button>
        </Form>
      )}
    </Formik>
  )
};

export const Dialogs = (props: any) => {
  return (
    <div className={s.dialogsContainer}>
      <div className={s.dialogs}>
        {props.dialogs.map((d: any) => <DialogItem key={d.name} id={d.id} name={d.name}/>)}
      </div>
      <div className={s.messages}>
        {props.messages.map((m: any) => <Message key={m.id} id={m.id} text={m.text}/>)}
        <AddMessageForm onSubmit={props.sendMessage}/>
      </div>
    </div>
  )
};
