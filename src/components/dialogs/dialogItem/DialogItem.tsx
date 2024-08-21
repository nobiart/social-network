import s from "./DialogItem.module.css";
import {NavLink} from "react-router-dom";

export interface IDialogItemProps {
  id: string
  name: string;
}

export const DialogItem = ({name, id}: IDialogItemProps) => {
  return (
    <div className={s.dialog}>
      <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
    </div>
  )
};
