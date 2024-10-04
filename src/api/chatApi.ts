export type ChatMessageType = {
  message: string,
  photo: string,
  userId: number,
  userName: string,
}

type SubscriberType = (messages: ChatMessageType[]) => void;

let ws: WebSocket | null = null;

const handleClose = () => {
  console.log("CLOSE WS");
  setTimeout(createChannel, 3000);
};

const handleMessages = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers.forEach(s => s(newMessages));
};

const createChannel = () => {
  ws?.removeEventListener("open", handleClose);
  ws?.close();
  ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
  ws.addEventListener("close", handleClose);
  ws.addEventListener("message", handleMessages);
};

let subscribers: SubscriberType[] = [];

export const chatAPI = {
  start() {
    createChannel();
  },
  subscribe(callback: SubscriberType) {
    subscribers.push(callback)
    return () => {
      subscribers = subscribers.filter(s => s !== callback);
    }
  },
  unsubscribe(callback: SubscriberType) {
    subscribers = subscribers.filter(s => s !== callback);
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
  stop() {
    subscribers = [];
    ws?.removeEventListener("close", handleClose);
    ws?.removeEventListener("message", handleMessages);
    ws?.close();
  },
}
