import s from './Posts.module.css';
import {Post} from "./post/Post.tsx";
import {memo} from "react";
import {AddPostForm} from "./AddPostForm.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStateType} from "../../../redux/reduxStore.ts";
import {profileActions, ProfileActionsType} from "../../../redux/profileReducer.ts";

export const Posts = memo(() => {
  const posts = useSelector((state: AppStateType) => state.profilePage.posts);
  const dispatch: AppDispatch<ProfileActionsType["type"]> = useDispatch();

  const onAddPost = (newPost: string) => {
    dispatch(profileActions.addPostActionCreator(newPost));
  };

  return (
    <div className={s.container}>
      <h3>My Posts</h3>
      <AddPostForm onSubmit={onAddPost}/>
      <div className={s.posts}>
        {posts?.map((p) => <Post key={p.id} message={p.message}/>)}
      </div>
    </div>
  )
});
