import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

interface IDialogItemProps {
  id: string
  name: string;
}

const DialogItem = ({name, id}: IDialogItemProps) => {
  return (
    <div className={s.dialog}>
      <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
    </div>
  )
}

interface IMessage {
  id: string;
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
  const dialogs: IDialogItemProps[] = [
    {id: "1", name: "Ivan"},
    {id: "2", name: "Petya"},
    {id: "3", name: "Jora"},
  ];

  const messages: IMessage[] = [
    {id: "1", text: "Message 1"},
    {id: "2", text: "Message 2"},
    {id: "3", text: "Message 3"},
  ];

  const dialogsElement = dialogs.map(d => <DialogItem id={d.id} name={d.name}/>);
  const messagesElements = messages.map(m => <Message id={m.id} text={m.text}/>);

  return (
    <div className={s.dialogsContainer}>
      <div className={s.dialogs}>
        {dialogsElement}
      </div>
      <div className={s.messages}>
        {messagesElements}
      </div>
    </div>
  )
}
