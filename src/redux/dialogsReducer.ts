const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

export const dialogsReducer = (state: any, action: any) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.messageBody;
      return state;
    case SEND_MESSAGE:
      const newMessage = {
        id: String(state.messages.length + 2),
        text: state.newMessageBody
      }
      state.messages.push(newMessage);
      state.newMessageBody = '';
      return state;
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
