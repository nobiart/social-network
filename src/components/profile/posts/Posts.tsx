import s from './Posts.module.css';
import {IPostProps, Post} from "./post/Post.tsx";
import {useRef} from "react";

interface IPostsProps {
  posts: IPostProps[];
  newPostText: string;
  addPost: () => void;
  updateNewPostText: (v: string) => void;
}

export const Posts = ({posts, newPostText, addPost, updateNewPostText}: IPostsProps) => {
  const postsElements = posts.map(p => <Post key={p.id} {...p} />);

  const newPostElement = useRef<HTMLTextAreaElement>(null);

  const onPostTextChange = () => {
    let text = newPostElement.current?.value ?? '';
    updateNewPostText(text);
  }

  return (
    <div className={s.container}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea ref={newPostElement} onChange={onPostTextChange} value={newPostText} name="newPost"/>
        </div>
        <button onClick={addPost} className={s.submit}>Add New Post</button>
      </div>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  )
};
