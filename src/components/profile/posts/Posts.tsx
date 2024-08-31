import s from './Posts.module.css';
import {IPostProps, Post} from "./post/Post.tsx";
import {useRef} from "react";

interface IPostsProps {
  posts: IPostProps[];
  newPostText: string;
  dispatch: (action: any) => void;
}

export const Posts = ({posts, newPostText, dispatch}: IPostsProps) => {
  const postsElements = posts.map(p => <Post key={p.id} {...p} />);

  const newPostElement = useRef<HTMLTextAreaElement>(null);

  const addPost = () => {
    dispatch({type: 'ADD_POST'})
  };

  const onPostTextChange = () => {
    let text = newPostElement.current?.value ?? '';
    dispatch({type: 'UPDATE_NEW_POST_TEXT', newText: text});
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
