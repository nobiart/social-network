import s from './Dialogs.module.css';
import {DialogItem} from "./dialogItem/DialogItem.tsx";
import {Message} from "./message/Message.tsx";
import {Field, Form, Formik} from "formik";
import {DialogsMapDispatchType, DialogsMapStateType} from "./DialogsContainer.tsx";

const AddMessageForm = ({sendMessage}: DialogsMapDispatchType) => {
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

export type DialogsPropsType = DialogsMapStateType & DialogsMapDispatchType;

export const Dialogs = ({dialogs, messages, sendMessage}: DialogsPropsType) => {
  return (
    <div className={s.dialogsContainer}>
      <div className={s.dialogs}>
        {dialogs.map((d) => <DialogItem key={d.id} id={d.id} name={d.name}/>)}
      </div>
      <div className={s.messages}>
        {messages.map((m) => <Message key={m.id} id={m.id} text={m.text}/>)}
        <AddMessageForm sendMessage={sendMessage}/>
      </div>
    </div>
  )
};
