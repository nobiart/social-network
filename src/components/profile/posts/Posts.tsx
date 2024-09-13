import s from './Posts.module.css';
import {Post} from "./post/Post.tsx";
import {useRef} from "react";

export const Posts = (props: any) => {
  const newPostElement = useRef<HTMLTextAreaElement>(null);

  const onPostTextChange = () => {
    let text = newPostElement.current?.value ?? '';
    props.updateNewPostText(text);
  }

  return (
    <div className={s.container}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea ref={newPostElement} onChange={onPostTextChange} value={props.newPostText} name="newPost"/>
        </div>
        <button onClick={props.addPost} className={s.submit}>Add New Post</button>
      </div>
      <div className={s.posts}>
        {props.posts.map((p: any) => <Post key={p.id} {...p} />)}
      </div>
    </div>
  )
};
