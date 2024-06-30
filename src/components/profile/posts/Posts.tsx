import s from './Posts.module.css';
import {Post} from "./post/Post.tsx";

export const Posts = () => {
  return (
    <div>
      My Posts
      <div>
        <textarea name="newPost" id=""></textarea>
        <button className={s.submit}>Add New Post</button>
      </div>
      <div className={s.posts}>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
      </div>
    </div>
  )
};
