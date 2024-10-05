import {memo, UIEvent, useEffect, useRef, useState} from "react";
import {ChatMessageType} from "../../api/chatApi.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/reduxStore.ts";
import {ChatActionsType, sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chatReducer.ts";


const ChatMessageItem = memo(({message}: { message: ChatMessageType }) => {
  console.log(">>>>>ChatMessageItem");

  return (
    <div>
      <img src={message.photo} alt={message.userName} style={{width: "30px", height: "30px"}}/>
      <b>{message.userName}</b>
      <br/>
      {message.message}
      <hr/>
    </div>
  )
});

const ChatMessages = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [isAutoscroll, setIsAutoscroll] = useState(true);

  const scrollHandler = (e: UIEvent) => {
    const element = e.target as HTMLElement;
    if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 400) {
      setIsAutoscroll(prevState => !prevState);
    } else {
      setIsAutoscroll(prevState => !prevState);
    }
  }

  useEffect(() => {
    if (isAutoscroll) {
      messagesRef.current?.scrollIntoView({behavior: "smooth"});
    }
  }, [messages]);

  return (
    <div style={{height: "300px", overflowY: "auto"}} onScroll={scrollHandler}>
      {messages.map((m, i) => (
        <ChatMessageItem key={`${m.message}::${m.userName}::${i}`} message={m}/>
      ))}
      <div ref={messagesRef}></div>
    </div>
  )
};

const AddChatMessageForm = () => {
  const [message, setMessage] = useState("");
  const status = useSelector((state: AppStateType) => state.chat.status);

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
      <button disabled={status !== "ready"} onClick={onSendMessage}>Send</button>
    </div>
  )
};

const Chat = memo(() => {
  const dispatch: AppDispatch<ChatActionsType["type"]> = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status);

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
      {status === "error" && <div>Some error. Please refresh the page</div>}
      <ChatMessages/>
      <AddChatMessageForm/>
    </>
  )
});

export const ChatPage = () => {
  return <Chat/>;
};
