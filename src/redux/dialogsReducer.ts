type DialogItemType = {
  id: string;
  name: string;
}

type MessageItemType = {
  id: string;
  text: string;
}

type DialogsStateType = {
  dialogs: DialogItemType[];
  messages: MessageItemType[];
}

const SEND_MESSAGE = 'SN/DIALOGS/SEND_MESSAGE';

const initialState: DialogsStateType = {
  dialogs: [
    {id: "1", name: "Ivan"},
    {id: "2", name: "Petya"},
    {id: "3", name: "Jora"},
  ],
  messages: [
    {id: "1", text: "Message 1"},
    {id: "2", text: "Message 2"},
    {id: "3", text: "Message 3"},
  ],
};

export const dialogsReducer = (state = initialState, action: SendMessageActionType): DialogsStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      const newMessage = {
        id: String(state.messages.length + 2),
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

type SendMessageActionType = {
  type: typeof SEND_MESSAGE,
  payload: { newMessageBody: string }
}

export const sendMessageCreator = (newMessageBody: string): SendMessageActionType => ({
  type: SEND_MESSAGE,
  payload: {newMessageBody}
});
