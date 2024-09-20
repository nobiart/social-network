import {ProfileInfo} from "./info/ProfileInfo.tsx";
import {PostsContainer} from "./posts/PostsContainer.tsx";

interface IProfileProps {
  isOwner: boolean,
  profile: any,
  status: string,
  updateStatus: (status: string) => void,
  savePhoto: (file?: File) => void;
  saveProfile: (formData: any, setStatus: (status?: any) => void) => Promise<void>;
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
