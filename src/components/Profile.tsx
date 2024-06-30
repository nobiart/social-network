import mainImage from "../assets/main-image.jpg";
import userName from "../assets/username.png";
import s from './Profile.module.css';

export const Profile = () => {
  return (
    <div className={s.mainContent}>
      <div>
        <img className={s.mainImage} src={mainImage} alt=""/>
      </div>
      <div>
        <img className={s.userImage} src={userName} alt=""/>
      </div>
      <div>
        My Posts
        <div>New Post</div>
        <div className={s.posts}>
          <div className={s.item}>Post 1</div>
          <div className={s.item}>Post 2</div>
          <div className={s.item}>Post 3</div>
        </div>
      </div>
    </div>
  )
};
