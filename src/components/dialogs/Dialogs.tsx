import s from './Dialogs.module.css';
import {Dialog} from "./dialog/Dialog.tsx";
import {Message} from "./message/Message.tsx";
import {AddMessageForm} from "./AddMessageForm.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/reduxStore.ts";
import {dialogsActions, DialogsActionsType} from "../../redux/dialogsReducer.ts";

export const Dialogs = () => {
  const dialogs = useSelector((state: AppStateType) => state.dialogsPage.dialogs);
  const messages = useSelector((state: AppStateType) => state.dialogsPage.messages);
  const dispatch: AppDispatch<DialogsActionsType["type"]> = useDispatch();

  const onSendMessage = (text: string) => {
    dispatch(dialogsActions.sendMessage(text));
  }

  return (
    <div className={s.dialogsContainer}>
      <div className={s.dialogs}>
        {dialogs.map((d) => <Dialog key={d.id} id={d.id} name={d.name}/>)}
      </div>
      <div className={s.messages}>
        {messages.map((m) => <Message key={m.id} id={m.id} text={m.text}/>)}
        <AddMessageForm sendMessage={onSendMessage}/>
      </div>
    </div>
  )
};
