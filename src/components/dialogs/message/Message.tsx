import s from "./Message.module.css";

type MessageItemType = {
  id: number;
  text: string;
}

export const Message = ({text}: MessageItemType) => {
  return (
    <div className={s.message}>
      {text}
    </div>
  )
};
