import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

export const Dialogs = () => {
  return (
    <div className={s.dialogsContainer}>
      <div className={s.dialogs}>
        <div className={s.dialog}>
          <NavLink to="/dialogs/1">Ivan</NavLink>
        </div>
        <div className={`${s.dialog} ${s.activeDialog}`}>
          <NavLink to="/dialogs/2">Petya</NavLink>
        </div>
        <div className={s.dialog}>
          <NavLink to="/dialogs/3">Jora</NavLink>
        </div>
      </div>
      <div className={s.messages}>
        <div className={s.message}>
          Message 1
        </div>
        <div className={s.message}>
          Message 2
        </div>
        <div className={s.message}>
          Message 3
        </div>
      </div>
    </div>
  )
}
