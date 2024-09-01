import s from './Dialogs.module.css';
import {DialogItem, IDialogItemProps} from "./dialogItem/DialogItem.tsx";
import {IMessage, Message} from "./message/Message.tsx";
import {sendMessageCreator, updateMessageBodyCreator} from "../../redux/state.ts";
import {ChangeEvent} from "react";

interface IDialogsProps {
  state: {
    dialogs: IDialogItemProps[];
    messages: IMessage[];
    newMessageBody: string;
  }
  dispatch: (action: any) => void;
}

export const Dialogs = ({state, dispatch}: IDialogsProps) => {
  const onSendMessage = () => {
    dispatch(sendMessageCreator());
  };

  const onMessageTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target?.value ?? '';
    dispatch(updateMessageBodyCreator(message));
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
            <textarea
              placeholder="Enter your message"
              value={state.newMessageBody}
              onChange={onMessageTextChange}
            >
            </textarea>
          </div>
          <button onClick={onSendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
};
