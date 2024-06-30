import mainImage from "../../assets/main-image.jpg";
import userName from "../../assets/username.png";
import s from './Profile.module.css';
import {Posts} from "./posts/Posts.tsx";

export const Profile = () => {
  return (
    <div>
      <div>
        <img className={s.mainImage} src={mainImage} alt=""/>
      </div>
      <div>
        <img className={s.userImage} src={userName} alt=""/>
      </div>
      <Posts/>
    </div>
  )
};
