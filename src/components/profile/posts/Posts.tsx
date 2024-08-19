import s from './Posts.module.css';
import {Post} from "./post/Post.tsx";

export const Posts = () => {
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
        <Post message="Hi, how are you?" likes={0}/>
        <Post message="It's OK, thanks!" likes={1}/>
        <Post message="Thanks!" likes={3}/>
        <Post message="My nth Post" likes={5}/>
        <Post message="Hello, World!" likes={8}/>
      </div>
    </div>
  )
};
