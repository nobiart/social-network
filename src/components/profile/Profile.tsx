import {ProfileInfo} from "./info/ProfileInfo.tsx";
import {PostsContainer} from "./posts/PostsContainer.tsx";

export const Profile = (props: any) => {
  return (
    <div>
      <ProfileInfo profile={props.profile}/>
      <PostsContainer/>
    </div>
  )
};
