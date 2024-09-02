import {ProfileInfo} from "./info/ProfileInfo.tsx";
import {PostsContainer} from "./posts/PostsContainer.tsx";

export const Profile = ({store}: any) => {
  return (
    <div>
      <ProfileInfo/>
      <PostsContainer store={store}/>
    </div>
  )
};
