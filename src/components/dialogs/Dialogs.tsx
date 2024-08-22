import s from './Dialogs.module.css';
import {DialogItem, IDialogItemProps} from "./dialogItem/DialogItem.tsx";
import {IMessage, Message} from "./message/Message.tsx";
import {useRef} from "react";

interface IDialogsProps {
  state: {
    dialogs: IDialogItemProps[];
    messages: IMessage[];
  }
}

export const Dialogs = ({state}: IDialogsProps) => {
  const messageInput = useRef<HTMLTextAreaElement>(null);

  const addMessage = () => {
    const message = messageInput.current?.value;
    alert(message);
  };

  return (
    <div className={s.dialogsContainer}>
      <div className={s.dialogs}>
        {state.dialogs.map(d => <DialogItem key={d.name} id={d.id} name={d.name}/>)}
      </div>
      <div className={s.messages}>
        {state.messages.map(m => <Message key={m.id} id={m.id} text={m.text}/>)}
        <div>
          <div>
            <textarea ref={messageInput} name="message"></textarea>
          </div>
          <button onClick={addMessage}>Add Message</button>
        </div>
      </div>
    </div>
  )
};
