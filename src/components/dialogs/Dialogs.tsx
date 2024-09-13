import s from './Dialogs.module.css';
import {DialogItem} from "./dialogItem/DialogItem.tsx";
import {Message} from "./message/Message.tsx";
import {ChangeEvent} from "react";

export const Dialogs = (props: any) => {
  const onMessageTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target?.value ?? '';
    props.changeText(message);
  };

  return (
    <div className={s.dialogsContainer}>
      <div className={s.dialogs}>
        {props.dialogs.map((d: any) => <DialogItem key={d.name} id={d.id} name={d.name}/>)}
      </div>
      <div className={s.messages}>
        {props.messages.map((m: any) => <Message key={m.id} id={m.id} text={m.text}/>)}
        <div>
          <div>
            <textarea
              placeholder="Enter your message"
              value={props.messageText}
              onChange={onMessageTextChange}
            >
            </textarea>
          </div>
          <button onClick={props.sendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
};
