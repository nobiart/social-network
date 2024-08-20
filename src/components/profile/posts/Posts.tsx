import s from './Posts.module.css';
import {IPostProps, Post} from "./post/Post.tsx";

export const Posts = () => {
  const posts: IPostProps[] = [
    {id: "1", message: "Hi, how are you?", likes: 12},
    {id: "2", message: "It's OK, thanks!", likes: 1},
    {id: "3", message: "Thanks!", likes: 0},
    {id: "4", message: "My nth Post", likes: 5},
    {id: "5", message: "Hello, World!", likes: 8},
  ]

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
