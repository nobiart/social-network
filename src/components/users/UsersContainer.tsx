import {connect} from "react-redux";
import {followCreator, setUsersCreator, unfollowCreator} from "../../redux/usersReducer.ts";
import {UsersCC} from "./UsersCC.tsx";

const mapStateToProps = (state: any) => {
  return {
    users: state.usersPage.users,
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    follow: (userId: number) => {
      dispatch(followCreator(userId));
    },
    unfollow: (userId: number) => {
      dispatch(unfollowCreator(userId));
    },
    setUsers: (users: any) => {
      dispatch(setUsersCreator(users));
    }
  }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersCC);
