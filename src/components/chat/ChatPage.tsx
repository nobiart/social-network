import {memo, useEffect, useState} from "react";
import {ChatMessageType} from "../../api/chatApi.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/reduxStore.ts";
import {ChatActionsType, sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chatReducer.ts";


const ChatMessageItem = ({message}: { message: ChatMessageType }) => {
  return (
    <div>
      <img src={message.photo} alt={message.userName} style={{width: "30px", height: "30px"}}/>
      <b>{message.userName}</b>
      <br/>
      {message.message}
      <hr/>
    </div>
  )
};

const ChatMessages = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);

  return (
    <div style={{height: "300px", overflowY: "auto"}}>
      {messages.map((m, i) => (
        <ChatMessageItem key={`${m.message}::${m.userName}::${i}`} message={m}/>
      ))}
    </div>
  )
};

const AddChatMessageForm = () => {
  const [message, setMessage] = useState("");

  const dispatch: AppDispatch<ChatActionsType["type"]> = useDispatch();

  const onSendMessage = () => {
    if (!message) return;
    dispatch(sendMessage(message));
    setMessage("")
  };

  return (
    <div>
      <div>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)}/>
      </div>
      <button onClick={onSendMessage}>Send</button>
    </div>
  )
};

const Chat = memo(() => {
  const dispatch: AppDispatch<ChatActionsType["type"]> = useDispatch();

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListening());
    }
  }, []);

  return (
    <>
      <h2>Chat</h2>
      <hr/>
      <ChatMessages/>
      <AddChatMessageForm/>
    </>
  )
});

export const ChatPage = () => {
  return <Chat/>;
};
