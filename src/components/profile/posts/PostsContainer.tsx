import {Posts} from "./Posts.tsx";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/profileReducer.ts";
import {StoreContext} from "../../../StoreContext.tsx";

export const PostsContainer = () => {
  return (
    <StoreContext.Consumer>
      {(store) => {
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
      }}
    </StoreContext.Consumer>

  )
};
