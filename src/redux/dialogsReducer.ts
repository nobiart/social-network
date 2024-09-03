const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
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
  newMessageBody: '',
};

export const dialogsReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      return {
        ...state,
        newMessageBody: action.messageBody,
      };
    case SEND_MESSAGE:
      const newMessage = {
        id: String(state.messages.length + 2),
        text: state.newMessageBody
      }
      return {
        ...state,
        newMessageBody: '',
        messages: [...state.messages, newMessage]
      };
    default:
      return state;
  }
};

export const sendMessageCreator = () => ({type: SEND_MESSAGE});
export const updateMessageBodyCreator = (text: string) => (
  {
    type: UPDATE_NEW_MESSAGE_BODY,
    messageBody: text
  }
);
