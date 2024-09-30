import {Dialogs} from "./Dialogs.tsx";
import {dialogsActions} from "../../redux/dialogsReducer.ts";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../redux/reduxStore.ts";

export type DialogsMapStateType = {
  dialogs: { id: number, name: string }[];
  messages: { id: number, text: string }[];
}

export type DialogsMapDispatchType = {
  sendMessage: (text: string) => void;
}

const mapStateToProps = (state: AppStateType): DialogsMapStateType => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
  }
};

export const DialogsContainer = compose(
  connect<DialogsMapStateType, DialogsMapDispatchType, {}, AppStateType>(mapStateToProps, {sendMessage: dialogsActions.sendMessage}),
  // withAuthRedirect
)(Dialogs);
