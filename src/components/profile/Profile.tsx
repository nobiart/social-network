import {Posts} from "./posts/Posts.tsx";
import {ProfileInfo} from "./info/ProfileInfo.tsx";
import {IPostProps} from "./posts/post/Post.tsx";

interface IProfileProps {
  state: {
    posts: IPostProps[];
  }
  addPost: (v: string) => void;
}

export const Profile = ({state, addPost}: IProfileProps) => {
  return (
    <div>
      <ProfileInfo/>
      <Posts posts={state.posts} addPost={addPost}/>
    </div>
  )
};
