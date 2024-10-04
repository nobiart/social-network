import s from './Post.module.css';
import userPic from '../../../../assets/username.png';

export interface IPostProps {
  message: string;
  likes?: number;
}

export const Post = ({message, likes}: IPostProps) => {
  return (
    <div className={s.item}>
      <img className={s.userPic} src={userPic} alt=""/>
      {message}
      <div>
        Like
        <span>{likes}</span>
      </div>
    </div>
  )
};
