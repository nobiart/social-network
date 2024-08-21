import s from './Posts.module.css';
import {IPostProps, Post} from "./post/Post.tsx";

interface IPostsProps {
  posts: IPostProps[];
}

export const Posts = ({posts}: IPostsProps) => {
  const postsElements = posts.map(p => <Post {...p} />);

  return (
    <div className={s.container}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea name="newPost" id=""></textarea>
        </div>
        <button className={s.submit}>Add New Post</button>
      </div>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  )
};
