import {Posts} from "./posts/Posts.tsx";
import {ProfileInfo} from "./info/ProfileInfo.tsx";
import {IPostProps} from "./posts/post/Post.tsx";

interface IProfileProps {
  state: {
    posts: IPostProps[];
  }
}

export const Profile = ({state}: IProfileProps) => {
  return (
    <div>
      <ProfileInfo/>
      <Posts posts={state.posts}/>
    </div>
  )
};
