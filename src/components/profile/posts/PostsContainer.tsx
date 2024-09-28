import {Posts} from "./Posts.tsx";
import {profileActions} from "../../../redux/profileReducer.ts";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/WithAuthRedirect.tsx";

const mapStateToProps = (state: any) => {
  return {
    posts: state.profilePage.posts,
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addPost: (text: string) => {
      dispatch(profileActions.addPostActionCreator(text))
    }
  }
};

export const PostsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Posts);
