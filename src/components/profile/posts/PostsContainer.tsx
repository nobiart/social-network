import {Posts} from "./Posts.tsx";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/profileReducer.ts";

export const PostsContainer = ({store}: any) => {
  console.log('rrr', store.getState().profilePage);
  const onPostTextChange = (text: string) => {
    store.dispatch(updatePostTextActionCreator(text));
  };

  const addPost = () => {
    store.dispatch(addPostActionCreator());
  };

  return (
    <Posts
      updateNewPostText={onPostTextChange}
      addPost={addPost}
      posts={store.getState().profilePage.posts}
      newPostText={store.getState().profilePage.newPostText}
    />
  )
};
