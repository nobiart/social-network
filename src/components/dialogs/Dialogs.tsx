import s from './Dialogs.module.css';

export const Dialogs = () => {
  return (
    <div className={s.dialogsContainer}>
      <div className={s.dialogs}>
        <div className={s.dialog}>
          Ivan
        </div>
        <div className={`${s.dialog} ${s.activeDialog}`}>
          Petya
        </div>
        <div className={s.dialog}>
          Jora
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
