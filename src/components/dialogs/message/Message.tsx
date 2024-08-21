import s from "./Message.module.css";

export interface IMessage {
  id: string;
  text: string;
}

export const Message = ({text}: IMessage) => {
  return (
    <div className={s.message}>
      {text}
    </div>
  )
};
