export type ChatMessageType = {
  message: string,
  photo: string,
  userId: number,
  userName: string,
}

export type WSStatusType = "pending" | "ready" | "error";
type MessageSubscriberType = (messages: ChatMessageType[]) => void;
type StatusSubscriberType = (status: WSStatusType) => void;

let ws: WebSocket | null = null;

const handleClose = () => {
  notifySubscribersAboutStatus("pending");
  setTimeout(createChannel, 3000);
};

const handleMessages = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers["message-received"].forEach(s => s(newMessages));
};

const handleOpen = () => {
  notifySubscribersAboutStatus("ready");
}

const handleError = () => {
  notifySubscribersAboutStatus("error");
  console.error("WS ERROR");
}

const cleanUp = () => {
  ws?.removeEventListener("open", handleClose);
  ws?.removeEventListener("message", handleMessages);
  ws?.removeEventListener("close", handleClose);
  ws?.removeEventListener("error", handleError);
  ws?.close();
}

const notifySubscribersAboutStatus = (status: WSStatusType) => {
  subscribers["status-changed"].forEach(s => s(status));
}

const createChannel = () => {
  cleanUp();
  ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
  notifySubscribersAboutStatus("pending");
  ws?.addEventListener("close", handleClose);
  ws?.addEventListener("message", handleMessages);
  ws?.addEventListener("open", handleOpen);
  ws?.addEventListener("error", handleError);
};

const subscribers = {
  "message-received": [] as MessageSubscriberType[],
  "status-changed": [] as StatusSubscriberType[],
};

export const chatAPI = {
  start() {
    createChannel();
  },
  subscribeOnNewMessages(callback: MessageSubscriberType) {
    subscribers["message-received"].push(callback)
    return () => {
      subscribers["message-received"] = subscribers["message-received"].filter(s => s !== callback);
    }
  },
  unsubscribeFromNewMessages(callback: MessageSubscriberType) {
    subscribers["message-received"] = subscribers["message-received"].filter(s => s !== callback);
  },
  subscribeOnStatusChange(callback: StatusSubscriberType) {
    subscribers["status-changed"].push(callback)
    return () => {
      subscribers["status-changed"] = subscribers["status-changed"].filter(s => s !== callback);
    }
  },
  unsubscribeFromStatusChange(callback: StatusSubscriberType) {
    subscribers["status-changed"] = subscribers["status-changed"].filter(s => s !== callback);
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
  stop() {
    subscribers["message-received"] = [];
    subscribers["status-changed"] = [];
    cleanUp();
  },
}
