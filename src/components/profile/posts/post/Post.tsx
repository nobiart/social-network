import s from './Post.module.css';
import userPic from '../../../../assets/username.png';

interface IProps {
  message: string;
  likes?: number;
}

export const Post = ({message, likes}: IProps) => {
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
