import s from "./ProfileInfo.module.css";
import userPic from "../../../assets/username.png";
import {Preloader} from "../../common/preloader/Preloader.tsx";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks.tsx";
import {ChangeEvent} from "react";

interface IProfileInfoProps {
  isOwner: boolean,
  profile: any,
  status: string,
  updateStatus: (status: string) => void,
  savePhoto: (file?: File) => void;
}

export const ProfileInfo = ({isOwner, profile, status, updateStatus, savePhoto}: IProfileInfoProps) => {
  if (!profile) {
    return <Preloader/>;
  }

  const onAvaSelected = (e: ChangeEvent) => {
    if ((e.target as HTMLInputElement).files && (e.target as HTMLInputElement).files?.length) {
      savePhoto((e.target as HTMLInputElement).files?.[0]);
    }
  }

  return (
    <>
      <div>
        {profile.fullName}
      </div>
      <div className={s.infoContainer}>
        <img className={s.userImage} src={profile?.photos?.large ?? userPic} alt={profile.fullName}/>
        {isOwner && <input type="file" onChange={onAvaSelected}/>}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
      </div>
    </>
  )
}
