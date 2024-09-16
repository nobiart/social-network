import {connect} from "react-redux";
import {followThunkCreator, getUsersThunkCreator, unfollowThunkCreator} from "../../redux/usersReducer.ts";
import React from "react";
import {Users} from "./Users.tsx";
import {Preloader} from "../common/preloader/Preloader.tsx";
import {compose} from "redux";
import {
  getCurrentPage,
  getFollowingProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers
} from "../../redux/usersSelectors.ts";

class UsersAPIComponent extends React.Component<any, any> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onChangePage = (pageNumber: number) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader/> : null}
        <Users
          totalCount={this.props.totalCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          onChangePage={this.onChangePage}
          isFollowing={this.props.isFollowingInProgress}
        />
      </>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    isFollowingInProgress: getFollowingProgress(state),
  }
};

export const UsersContainer = compose(
  connect(mapStateToProps, {
    follow: followThunkCreator,
    unfollow: unfollowThunkCreator,
    getUsers: getUsersThunkCreator,
  }),
  // withAuthRedirect
)(UsersAPIComponent);
