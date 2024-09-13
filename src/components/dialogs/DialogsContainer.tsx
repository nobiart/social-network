import {Dialogs} from "./Dialogs.tsx";
import {sendMessageCreator, updateMessageBodyCreator} from "../../redux/dialogsReducer.ts";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect.tsx";

const mapStateToProps = (state: any) => {
  return {
    messageText: state.dialogsPage.newMessageBody,
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    sendMessage: () => {
      dispatch(sendMessageCreator());
    },
    changeText: (text: string) => {
      dispatch(updateMessageBodyCreator(text));
    }
  }
};

export const DialogsContainer = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs));
