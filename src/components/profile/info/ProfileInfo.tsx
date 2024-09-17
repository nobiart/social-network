import s from "./ProfileInfo.module.css";
import userPic from "../../../assets/username.png";
import {Preloader} from "../../common/preloader/Preloader.tsx";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks.tsx";

interface IProfileInfoProps {
  profile: any,
  status: any,
  updateStatus: any,
}

export const ProfileInfo = ({profile, status, updateStatus}: IProfileInfoProps) => {
  if (!profile) {
    return <Preloader/>;
  }

  return (
    <>
      <div>
        {profile.fullName}
      </div>
      <div className={s.infoContainer}>
        <img className={s.userImage} src={profile?.photos?.small ?? userPic} alt=""/>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
      </div>
    </>
  )
}
