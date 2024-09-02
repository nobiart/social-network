import s from './Posts.module.css';
import {IPostProps, Post} from "./post/Post.tsx";
import {useRef} from "react";

interface IPostsProps {
  posts: IPostProps[];
  newPostText: string;
  updateNewPostText: (action: any) => void;
  addPost: () => void;
}

export const Posts = ({posts, newPostText, updateNewPostText, addPost}: IPostsProps) => {
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
        {posts.map(p => <Post key={p.id} {...p} />)}
      </div>
    </div>
  )
};
