import {connect} from "react-redux";
import {
  followCreator,
  setCurrentPageCreator,
  setTotalCountCreator,
  setUsersCreator,
  unfollowCreator
} from "../../redux/usersReducer.ts";
import {UsersCC} from "./UsersCC.tsx";

const mapStateToProps = (state: any) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalCount: state.usersPage.totalCount,
    currentPage: state.usersPage.currentPage,
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
    },
    setCurrentPage: (pageNumber: number) => {
      dispatch(setCurrentPageCreator(pageNumber));
    },
    setTotalCount: (count: number) => {
      dispatch(setTotalCountCreator(count));
    }
  }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersCC);
