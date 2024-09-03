import {Posts} from "./Posts.tsx";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/profileReducer.ts";
import {connect} from "react-redux";

const mapStateToProps = (state: any) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateNewPostText: (text: string) => {
      dispatch(updatePostTextActionCreator(text));
    },
    addPost: () => {
      dispatch(addPostActionCreator())
    }
  }
};

export const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);
