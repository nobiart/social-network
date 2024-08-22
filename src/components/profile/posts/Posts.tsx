import s from './Posts.module.css';
import {IPostProps, Post} from "./post/Post.tsx";
import {useRef} from "react";

interface IPostsProps {
  posts: IPostProps[];
  addPost: (v: string) => void;
}

export const Posts = ({posts, addPost}: IPostsProps) => {
  const postsElements = posts.map(p => <Post key={p.id} {...p} />);

  const newPostElement = useRef<HTMLTextAreaElement>(null);

  const addPostHandler = () => {
    const text = newPostElement.current?.value;
    text && addPost(text);
  }

  return (
    <div className={s.container}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea ref={newPostElement} name="newPost"></textarea>
        </div>
        <button onClick={addPostHandler} className={s.submit}>Add New Post</button>
      </div>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  )
};
