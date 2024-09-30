import {InferActionsTypes} from "./reduxStore.ts";

const initialState = {
  dialogs: [
    {id: 1, name: "Ivan"},
    {id: 2, name: "Petya"},
    {id: 3, name: "Jora"},
  ],
  messages: [
    {id: 1, text: "Message 1"},
    {id: 2, text: "Message 2"},
    {id: 3, text: "Message 3"},
  ],
};

// type DialogItemType = {
//   id: string;
//   name: string;
// }
//
// type MessageItemType = {
//   id: string;
//   text: string;
// }

type DialogsStateType = typeof initialState;
type DialogsActionsType = InferActionsTypes<typeof dialogsActions>;

export const dialogsReducer = (state = initialState, action: DialogsActionsType): DialogsStateType => {
  switch (action.type) {
    case 'SN/DIALOGS/SEND_MESSAGE':
      const newMessage = {
        id: state.messages.length + 2,
        text: action.payload.newMessageBody
      }
      return {
        ...state,
        messages: [...state.messages, newMessage]
      };
    default:
      return state;
  }
};

export const dialogsActions = {
  sendMessage: (newMessageBody: string) => ({
    type: 'SN/DIALOGS/SEND_MESSAGE',
    payload: {newMessageBody}
  } as const),
};
