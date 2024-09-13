import {connect} from "react-redux";
import {
  followThunkCreator,
  getUsersThunkCreator,
  setCurrentPage,
  setTotalCount,
  setUsers,
  toggleFetching,
  unfollowThunkCreator
} from "../../redux/usersReducer.ts";
import React from "react";
import {Users} from "./Users.tsx";
import {Preloader} from "../common/preloader/Preloader.tsx";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect.tsx";
import {compose} from "redux";

class UsersAPIComponent extends React.Component<any, any> {
  componentDidMount() {
    // this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    this.props.toggleFetching(true);
    this.props.setUsers([
      {
        id: 1,
        followed: false,
        photoUrl: 'https://i.pinimg.com/474x/c9/ce/76/c9ce76ccbaeee7c705fac54b52e6463a.jpg',
        fullName: 'John',
        status: 'I`m a dev',
        location: {
          country: 'Moldova',
          city: 'Tiraspol'
        }
      },
      {
        id: 2,
        followed: true,
        photoUrl: 'https://i.pinimg.com/originals/ec/98/4e/ec984e78e2e42293b165bcf3a19b29ef.jpg',
        fullName: 'Jack',
        status: 'Hi!',
        location: {
          country: 'Russia',
          city: 'Moscow'
        }
      },
      {
        id: 3,
        followed: false,
        photoUrl: 'https://i.pinimg.com/474x/c9/ce/76/c9ce76ccbaeee7c705fac54b52e6463a.jpg',
        fullName: 'Anna',
        status: 'I like oranges',
        location: {
          country: 'Ukraine',
          city: 'Kiyv'
        }
      },
      {
        id: 4,
        followed: true,
        photoUrl: 'https://i.pinimg.com/originals/ec/98/4e/ec984e78e2e42293b165bcf3a19b29ef.jpg',
        fullName: 'Sarah',
        status: 'Just married',
        location: {
          country: 'Belarus',
          city: 'Minsk'
        }
      },
    ]);
    this.props.setTotalCount(18);
    this.props.toggleFetching(false);
  }

  onChangePage = (pageNumber: number) => {
    // this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
    this.props.toggleFetching(true);
    this.props.setCurrentPage(pageNumber);
    this.props.toggleFetching(false);
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
          follow={this.props.followThunkCreator}
          unfollow={this.props.unfollowThunkCreator}
          onChangePage={this.onChangePage}
          isFollowing={this.props.isFollowingInProgress}
        />
      </>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalCount: state.usersPage.totalCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    isFollowingInProgress: state.usersPage.isFollowingInProgress,
  }
};

// @TODO remove setUsers setTotalCount toggleFetching

export const UsersContainer = compose(
  connect(mapStateToProps, {
    followThunkCreator,
    unfollowThunkCreator,
    setUsers,
    setCurrentPage,
    setTotalCount,
    toggleFetching,
    getUsersThunkCreator,
  }),
  withAuthRedirect
)(UsersAPIComponent);
