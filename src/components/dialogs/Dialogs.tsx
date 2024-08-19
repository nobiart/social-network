import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

interface IDialogItemProps {
  name: string;
  id: string
}

const DialogItem = ({name, id}: IDialogItemProps) => {
  return (
    <div className={s.dialog}>
      <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
    </div>
  )
}

interface IMessage {
  text: string;
}

const Message = ({text}: IMessage) => {
  return (
    <div className={s.message}>
      {text}
    </div>
  )
}

export const Dialogs = () => {
  return (
    <div className={s.dialogsContainer}>
      <div className={s.dialogs}>
        <DialogItem name="Ivan" id="1"/>
        <DialogItem name="Petya" id="2"/>
        <DialogItem name="Jora" id="3"/>
      </div>
      <div className={s.messages}>
        <Message text="Message 1"/>
        <Message text="Message 2"/>
        <Message text="Message 3"/>
      </div>
    </div>
  )
}
