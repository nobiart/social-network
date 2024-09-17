import {ProfileInfo} from "./info/ProfileInfo.tsx";
import {PostsContainer} from "./posts/PostsContainer.tsx";

interface IProfileProps {
  profile: any,
  status: any,
  updateStatus: any,
}

export const Profile = ({profile, status, updateStatus}: IProfileProps) => {
  return (
    <div>
      <ProfileInfo
        profile={profile}
        status={status}
        updateStatus={updateStatus}
      />
      <PostsContainer/>
    </div>
  )
};
