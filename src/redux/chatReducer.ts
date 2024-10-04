import {AppDispatch, BaseThunkType, InferActionsTypes} from "./reduxStore.ts";
import {chatAPI, ChatMessageType} from "../api/chatApi.ts";

export type ChatStateType = {
  messages: ChatMessageType[];
}

const initialState: ChatStateType = {
  messages: [],
};

export type ChatActionsType = InferActionsTypes<typeof chatActions>;
type ThunkType = BaseThunkType<ChatActionsType, void>;

export const chatReducer = (state = initialState, action: ChatActionsType): ChatStateType => {
  switch (action.type) {
    case "SN/CHAT/SET_MESSAGES": {
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    }
    default:
      return state;
  }
};

export const chatActions = {
  setMessages: (messages: ChatMessageType[]) => ({type: 'SN/CHAT/SET_MESSAGES', payload: {messages}} as const),
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

export const startMessagesListening = (): ThunkType => (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe(newMessageHandlerCreator(dispatch))
};

export const stopMessagesListening = (): ThunkType => (dispatch) => {
  chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
  chatAPI.stop();
};

export const sendMessage = (message: string): ThunkType => () => {
  chatAPI.sendMessage(message);
}
