import {Dialogs} from "./Dialogs.tsx";
import {dialogsActions} from "../../redux/dialogsReducer.ts";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect.tsx";
import {compose} from "redux";

const mapStateToProps = (state: any) => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    sendMessage: (text: string) => {
      dispatch(dialogsActions.sendMessageCreator(text));
    },
  }
};

export const DialogsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
