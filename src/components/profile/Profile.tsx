import {Posts} from "./posts/Posts.tsx";
import {ProfileInfo} from "./info/ProfileInfo.tsx";
import {IPostProps} from "./posts/post/Post.tsx";

interface IProfileProps {
  state: {
    posts: IPostProps[];
    newPostText: string;
  }
  dispatch: (action: any) => void;
}

export const Profile = ({state, dispatch}: IProfileProps) => {
  return (
    <div>
      <ProfileInfo/>
      <Posts posts={state.posts} newPostText={state.newPostText} dispatch={dispatch}/>
    </div>
  )
};
