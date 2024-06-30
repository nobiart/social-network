import s from './Post.module.css';
import userpic from '../../../../assets/username.png';

export const Post = () => {
  return (
    <div className={s.item}>
      <img className={s.userPic} src={userpic} alt=""/>
      Post 1
      <div>Like</div>
    </div>
  )
};
