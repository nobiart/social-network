import s from "./ProfileInfo.module.css";
import mainImage from "../../../assets/main-image.jpg";
import userName from "../../../assets/username.png";

export const ProfileInfo = () => {
  return (
    <>
      <div>
        <img className={s.mainImage} src={mainImage} alt=""/>
      </div>
      <div className={s.infoContainer}>
        <img className={s.userImage} src={userName} alt=""/>
      </div>
    </>
  )
}
