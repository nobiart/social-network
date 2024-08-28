import {Posts} from "./posts/Posts.tsx";
import {ProfileInfo} from "./info/ProfileInfo.tsx";
import {IPostProps} from "./posts/post/Post.tsx";

interface IProfileProps {
  state: {
    posts: IPostProps[];
    newPostText: string;
  }
  addPost: () => void;
  updateNewPostText: (v: string) => void;
}

export const Profile = ({state, addPost, updateNewPostText}: IProfileProps) => {
  return (
    <div>
      <ProfileInfo/>
      <Posts posts={state.posts} newPostText={state.newPostText} addPost={addPost}
             updateNewPostText={updateNewPostText}/>
    </div>
  )
};
