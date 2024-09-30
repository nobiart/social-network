import {connect} from "react-redux";
import {
  followThunkCreator,
  getUsersThunkCreator,
  unfollowThunkCreator,
  UsersFilterType,
  UserType
} from "../../redux/usersReducer.ts";
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
  getUsers,
  getUsersFilter
} from "../../redux/usersSelectors.ts";
import {AppStateType} from "../../redux/reduxStore.ts";

type MapStatePropsType = {
  users: UserType[],
  pageSize: number,
  totalCount: number,
  currentPage: number,
  filter: UsersFilterType,
  isFetching: boolean,
  isFollowingInProgress: number[],
};

type MapDispatchPropsType = {
  follow: (id: number) => void,
  unfollow: (id: number) => void,
  getUsers: (currentPage: number, pageSize: number, filter: UsersFilterType) => void,
};

type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType;

class UsersAPIComponent extends React.Component<UsersContainerPropsType> {
  componentDidMount() {
    const {getUsers, currentPage, pageSize, filter} = this.props;
    getUsers(currentPage, pageSize, filter);
  }

  onChangePage = (pageNumber: number) => {
    const {getUsers, pageSize, filter} = this.props;
    getUsers(pageNumber, pageSize, filter);
  }

  onChangeFilter = (filter: UsersFilterType) => {
    const {getUsers, pageSize} = this.props;
    getUsers(1, pageSize, filter);
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
          onChangeFilter={this.onChangeFilter}
          isFollowing={this.props.isFollowingInProgress}
        />
      </>
    )
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    filter: getUsersFilter(state),
    isFetching: getIsFetching(state),
    isFollowingInProgress: getFollowingProgress(state),
  }
};

export const UsersContainer = compose(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    follow: followThunkCreator,
    unfollow: unfollowThunkCreator,
    getUsers: getUsersThunkCreator,
  }),
)(UsersAPIComponent);
