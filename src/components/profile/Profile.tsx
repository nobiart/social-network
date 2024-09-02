import {ProfileInfo} from "./info/ProfileInfo.tsx";
import {PostsContainer} from "./posts/PostsContainer.tsx";

export const Profile = () => {
  return (
    <div>
      <ProfileInfo/>
      <PostsContainer/>
    </div>
  )
};
