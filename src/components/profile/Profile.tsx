import {Posts} from "./posts/Posts.tsx";
import {ProfileInfo} from "./info/ProfileInfo.tsx";

export const Profile = () => {
  return (
    <div>
      <ProfileInfo/>
      <Posts/>
    </div>
  )
};
