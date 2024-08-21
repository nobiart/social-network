import s from './Dialogs.module.css';
import {DialogItem, IDialogItemProps} from "./dialogItem/DialogItem.tsx";
import {IMessage, Message} from "./message/Message.tsx";

interface IDialogsProps {
  dialogs: IDialogItemProps[];
  messages: IMessage[];
}

export const Dialogs = ({dialogs, messages}: IDialogsProps) => {

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
