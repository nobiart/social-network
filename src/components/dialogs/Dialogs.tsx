import s from './Dialogs.module.css';
import {DialogItem, IDialogItemProps} from "./dialogItem/DialogItem.tsx";
import {IMessage, Message} from "./message/Message.tsx";

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

  return (
    <div className={s.dialogsContainer}>
      <div className={s.dialogs}>
        {dialogs.map(d => <DialogItem id={d.id} name={d.name}/>)}
      </div>
      <div className={s.messages}>
        {messages.map(m => <Message id={m.id} text={m.text}/>)}
      </div>
    </div>
  )
};
