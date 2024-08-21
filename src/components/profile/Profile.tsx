import {Posts} from "./posts/Posts.tsx";
import {ProfileInfo} from "./info/ProfileInfo.tsx";
import {IPostProps} from "./posts/post/Post.tsx";

interface IProfileProps {
  posts: IPostProps[];
}

export const Profile = ({posts}: IProfileProps) => {
  return (
    <div>
      <ProfileInfo/>
      <Posts posts={posts}/>
    </div>
  )
};
