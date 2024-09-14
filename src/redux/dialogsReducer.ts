const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
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

export const dialogsReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SEND_MESSAGE:
      const newMessage = {
        id: String(state.messages.length + 2),
        text: action.newMessageBody
      }
      return {
        ...state,
        messages: [...state.messages, newMessage]
      };
    default:
      return state;
  }
};

export const sendMessageCreator = (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody});
