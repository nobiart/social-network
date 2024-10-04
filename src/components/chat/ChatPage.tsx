import {useEffect, useState} from "react";

export type ChatMessageType = {
  message: string,
  photo: string,
  userId: number,
  userName: string,
}

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

const ChatMessages = ({wsChannel}: { wsChannel: WebSocket | null }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    let messageHandler = (e: MessageEvent) => {
      setMessages((prevState) => ([
        ...prevState,
        ...JSON.parse(e.data)
      ]));
    };
    wsChannel?.addEventListener("message", messageHandler);

    return () => {
      wsChannel?.removeEventListener("message", messageHandler);
    }
  }, [wsChannel]);

  return (
    <div style={{height: "300px", overflowY: "auto"}}>
      {messages.map((m, i) => (
        <ChatMessageItem key={`${m.message}::${m.userName}::${i}`} message={m}/>
      ))}
    </div>
  )
};

const AddChatMessageForm = ({wsChannel}: { wsChannel: WebSocket | null }) => {
  const [message, setMessage] = useState("");
  const [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending");

  useEffect(() => {
    let openHandler = () => setReadyStatus("ready");
    wsChannel?.addEventListener("open", openHandler);

    return () => {
      wsChannel?.removeEventListener("open", openHandler);
    }
  }, [wsChannel]);

  const sendMessage = () => {
    if (!message) return;
    wsChannel?.send(message);
    setMessage("");
  };

  return (
    <div>
      <div>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)}/>
      </div>
      <button disabled={wsChannel !== null || readyStatus !== "ready"} onClick={sendMessage}>Send</button>
    </div>
  )
};

const Chat = () => {
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket | null = null;
    const closeHandler = () => {
      console.log("CLOSE WS");
      setTimeout(createChannel, 3000);
    };
    const createChannel = () => {
      ws?.removeEventListener("open", closeHandler);
      ws?.close();
      ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
      ws.addEventListener("close", closeHandler);
      setWsChannel(ws);
    }
    createChannel();

    return () => {
      ws?.removeEventListener("open", closeHandler);
      ws?.close();
    }
  }, []);

  return (
    <>
      <h2>Chat</h2>
      <hr/>
      <ChatMessages wsChannel={wsChannel}/>
      <AddChatMessageForm wsChannel={wsChannel}/>
    </>
  )
};

export const ChatPage = () => {
  return <Chat/>;
};
