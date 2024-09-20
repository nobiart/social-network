import s from "./ProfileInfo.module.css";
import userPic from "../../../assets/username.png";
import {Preloader} from "../../common/preloader/Preloader.tsx";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks.tsx";
import {ChangeEvent, useState} from "react";
import {ProfileDataForm} from "./ProfileDataForm.tsx";

interface IProfileInfoProps {
  isOwner: boolean,
  profile: any,
  status: string,
  updateStatus: (status: string) => void,
  savePhoto: (file?: File) => void;
  saveProfile: (formData: any, setStatus: (status?: any) => void) => Promise<void>;
}

export const ProfileInfo = ({isOwner, profile, status, updateStatus, savePhoto, saveProfile}: IProfileInfoProps) => {
  const [editMode, setEditMode] = useState(false);

  // @TODO change async function, move edited prop to BLL
  const onSubmit = async (formData: any, setStatus: (status?: any) => void): Promise<void> => {
    await saveProfile(formData, setStatus);
    return setEditMode(false);
  }

  const onAvaSelected = (e: ChangeEvent) => {
    if ((e.target as HTMLInputElement).files && (e.target as HTMLInputElement).files?.length) {
      savePhoto((e.target as HTMLInputElement).files?.[0]);
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

interface IProfileDataProps {
  profile: any,
  isOwner: boolean,
  goToEditMode: any,
}

const ProfileData = ({profile, isOwner, goToEditMode}: IProfileDataProps) => {
  return (
    <>
      {isOwner && <div>
        <button onClick={goToEditMode}>Edit</button>
      </div>}
      <div><b>{profile.fullName}</b> ({profile.userId})</div>
      <div className={s.row}>
        <span><b>About Me:</b></span>
        <span>{profile.aboutMe ?? ""}</span>
      </div>
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
        return <Contact key={key} title={key} value={profile.contacts[key]}/>
      })}
    </>
  )
};

interface IContactProps {
  title: string,
  value: string,
}

const Contact = ({title, value}: IContactProps) => {
  return (
    <div className={s.row}>
      <span><b>{title}:</b></span>
      <span>{value}</span>
    </div>
  )
};
