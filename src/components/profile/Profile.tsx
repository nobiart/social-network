import {ProfileInfo} from "./info/ProfileInfo.tsx";
import {PostsContainer} from "./posts/PostsContainer.tsx";
import {ProfileType} from "../../redux/profileReducer.ts";

interface IProfileProps {
  isOwner: boolean,
  profile: any,
  status: string,
  updateStatus: (status: string) => void,
  savePhoto: (file?: File) => void;
  saveProfile: (profile: ProfileType, setStatus: (status?: any) => void) => void;
}

export const Profile = ({isOwner, profile, status, updateStatus, savePhoto, saveProfile}: IProfileProps) => {
  return (
    <div>
      <ProfileInfo
        isOwner={isOwner}
        profile={profile}
        status={status}
        updateStatus={updateStatus}
        savePhoto={savePhoto}
        saveProfile={saveProfile}
      />
      <PostsContainer/>
    </div>
  )
};
