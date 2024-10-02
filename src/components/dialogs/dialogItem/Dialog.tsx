import s from "./DialogItem.module.css";
import {Link} from "react-router-dom";

type DialogType = {
  id: number
  name: string;
}

export const Dialog = ({name, id}: DialogType) => {
  return (
    <div className={s.dialog}>
      <Link to={`/dialogs/${id}`}>{name}</Link>
    </div>
  )
};
