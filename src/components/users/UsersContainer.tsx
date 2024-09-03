import {connect} from "react-redux";
import {Users} from "./Users.tsx";
import {followCreator, setUsersCreator, unfollowCreator} from "../../redux/usersReducer.ts";

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

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
