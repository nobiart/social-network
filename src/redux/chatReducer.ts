import {AppDispatch, BaseThunkType, InferActionsTypes} from "./reduxStore.ts";
import {chatAPI, ChatMessageType, WSStatusType} from "../api/chatApi.ts";

export type ChatStateType = {
  messages: ChatMessageType[];
  status: WSStatusType;
}

const initialState: ChatStateType = {
  messages: [],
  status: "pending",
};

export type ChatActionsType = InferActionsTypes<typeof chatActions>;
type ThunkType = BaseThunkType<ChatActionsType, void>;

export const chatReducer = (state = initialState, action: ChatActionsType): ChatStateType => {
  switch (action.type) {
    case "SN/CHAT/SET_MESSAGES": {
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages].filter((_, i, arr) => i >= arr.length - 100),
      };
    }
    case "SN/CHAT/SET_STATUS": {
      return {
        ...state,
        status: action.payload.status,
      };
    }
    default:
      return state;
  }
};

export const chatActions = {
  setMessages: (messages: ChatMessageType[]) => ({type: 'SN/CHAT/SET_MESSAGES', payload: {messages}} as const),
  setStatus: (status: WSStatusType) => ({type: 'SN/CHAT/SET_STATUS', payload: {status}} as const),
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: AppDispatch<ChatActionsType["type"]>) => {
  if (_newMessageHandler === null) {
    console.log("_newMessageHandler");
    _newMessageHandler = (messages: ChatMessageType[]) => {
      dispatch(chatActions.setMessages(messages));
    }
  }

  return _newMessageHandler;
};

let _statusChangingHandler: ((status: WSStatusType) => void) | null = null;

const statusChangingHandlerCreator = (dispatch: AppDispatch<ChatActionsType["type"]>) => {
  if (_statusChangingHandler === null) {
    console.log("_statusChangingHandler");
    _statusChangingHandler = (status: WSStatusType) => {
      dispatch(chatActions.setStatus(status));
    }
  }

  return _statusChangingHandler;
};

export const startMessagesListening = (): ThunkType => (dispatch) => {
  chatAPI.start();
  chatAPI.subscribeOnNewMessages(newMessageHandlerCreator(dispatch));
  chatAPI.subscribeOnStatusChange(statusChangingHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => (dispatch) => {
  chatAPI.unsubscribeFromNewMessages(newMessageHandlerCreator(dispatch));
  chatAPI.unsubscribeFromStatusChange(statusChangingHandlerCreator(dispatch));
  chatAPI.stop();
};

export const sendMessage = (message: string): ThunkType => () => {
  chatAPI.sendMessage(message);
}
