import s from "./ProfileInfo.module.css";
import mainImage from "../../../assets/main-image.jpg";
import userPic from "../../../assets/username.png";
import {Preloader} from "../../common/preloader/Preloader.tsx";

export const ProfileInfo = (props: any) => {
  if (!props.profile) {
    return <Preloader/>;
  }

  return (
    <>
      <div>
        <img className={s.mainImage} src={mainImage} alt=""/>
      </div>
      <div>
        {props.profile.fullName}
      </div>
      <div className={s.infoContainer}>
        <img className={s.userImage} src={props.profile?.photos?.small ?? userPic} alt=""/>
      </div>
    </>
  )
}
