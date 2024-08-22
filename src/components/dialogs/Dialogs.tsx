import s from './Dialogs.module.css';
import {DialogItem, IDialogItemProps} from "./dialogItem/DialogItem.tsx";
import {IMessage, Message} from "./message/Message.tsx";

interface IDialogsProps {
  state: {
    dialogs: IDialogItemProps[];
    messages: IMessage[];
  }
}

export const Dialogs = ({state}: IDialogsProps) => {

  return (
    <div className={s.dialogsContainer}>
      <div className={s.dialogs}>
        {state.dialogs.map(d => <DialogItem id={d.id} name={d.name}/>)}
      </div>
      <div className={s.messages}>
        {state.messages.map(m => <Message id={m.id} text={m.text}/>)}
      </div>
    </div>
  )
};
