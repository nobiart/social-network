import {Dialogs} from "./Dialogs.tsx";
import {sendMessageCreator, updateMessageBodyCreator} from "../../redux/dialogsReducer.ts";

export const DialogsContainer = ({store}: any) => {
  const onSendMessage = () => {
    store.dispatch(sendMessageCreator());
  };

  const onMessageTextChange = (text: string) => {
    store.dispatch(updateMessageBodyCreator(text));
  };

  return (
    <Dialogs
      sendMessage={onSendMessage}
      changeText={onMessageTextChange}
      messageText={store.getState().dialogsPage.newMessageBody}
      dialogs={store.getState().dialogsPage.dialogs}
      messages={store.getState().dialogsPage.messages}
    />
  )
};
