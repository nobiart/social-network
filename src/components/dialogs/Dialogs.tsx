import s from './Dialogs.module.css';
import {DialogItem, IDialogItemProps} from "./dialogItem/DialogItem.tsx";
import {IMessage, Message} from "./message/Message.tsx";
import {ChangeEvent} from "react";

interface IDialogsProps {
  dialogs: IDialogItemProps[];
  messages: IMessage[];
  messageText: string;
  sendMessage: () => void;
  changeText: (text: string) => void;
}

export const Dialogs = ({dialogs, messages, messageText, sendMessage, changeText}: IDialogsProps) => {
  const onMessageTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target?.value ?? '';
    changeText(message);
  };

  return (
    <div className={s.dialogsContainer}>
      <div className={s.dialogs}>
        {dialogs.map(d => <DialogItem key={d.name} id={d.id} name={d.name}/>)}
      </div>
      <div className={s.messages}>
        {messages.map(m => <Message key={m.id} id={m.id} text={m.text}/>)}
        <div>
          <div>
            <textarea
              placeholder="Enter your message"
              value={messageText}
              onChange={onMessageTextChange}
            >
            </textarea>
          </div>
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
};
