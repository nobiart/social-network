import s from "./ProfileInfo.module.css";
import userPic from "../../../assets/username.png";
import {Preloader} from "../../common/preloader/Preloader.tsx";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks.tsx";
import {ChangeEvent, useState} from "react";
import {ProfileDataForm} from "./ProfileDataForm.tsx";
import {ProfileType} from "../../../redux/profileReducer.ts";

type ProfileInfoPropsType = {
  isOwner: boolean,
  profile: ProfileType,
  status: string,
  updateStatus: (status: string) => void,
  savePhoto: (file?: File) => void;
  saveProfile: (profile: ProfileType, setStatus: (status?: any) => void) => void;
}

export const ProfileInfo = ({isOwner, profile, status, updateStatus, savePhoto, saveProfile}: ProfileInfoPropsType) => {
  const [editMode, setEditMode] = useState(false);

  // @TODO change async function, move edited prop to BLL
  const onSubmit = async (profile: ProfileType, setStatus: (status?: any) => void): Promise<void> => {
    await saveProfile(profile, setStatus);
    return setEditMode(false);
  }

  const onAvaSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const photo = e.target.files[0];
      savePhoto(photo);
    }
  }

  if (!profile) {
    return <Preloader/>;
  }

  return (
    <div className={s.infoContainer}>

      <img className={s.userImage} src={profile?.photos?.large ?? userPic} alt={profile.fullName}/>
      {isOwner && <div><input type="file" onChange={onAvaSelected}/></div>}
      {editMode
        ? <ProfileDataForm handleSubmit={onSubmit} profile={profile}/>
        : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
    </div>
  )
};

type ProfileDataPropsType = {
  profile: ProfileType,
  isOwner: boolean,
  goToEditMode: () => void,
}

const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataPropsType) => {
  return (
    <>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>Edit</button>
        </div>
      )}
      <div><b>{profile.fullName}</b> ({profile.userId})</div>
      <div className={s.row}>
        <span><b>Is Looking For A Job:</b></span>
        <span>{profile.lookingForAJob ? "Yes" : "No"}</span>
      </div>
      {profile.lookingForAJob && (
        <div className={s.row}>
          <span><b>Job Description:</b></span>
          <span>{profile.lookingForAJobDescription ?? ""}</span>
        </div>
      )}
      <div>Contacts:</div>
      {(Object.keys(profile?.contacts ?? {})).map((key) => {
        return <Contact key={key} title={key} value={key}/>
      })}
    </>
  )
};

type ContactPropType = {
  title: string,
  value: string,
}

const Contact = ({title, value}: ContactPropType) => {
  return (
    <div className={s.row}>
      <span><b>{title}:</b></span>
      <span>{value}</span>
    </div>
  )
};
