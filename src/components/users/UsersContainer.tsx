import {connect} from "react-redux";
import {
  follow,
  setCurrentPage,
  setTotalCount,
  setUsers,
  toggleFetching,
  toggleFollowing,
  unfollow
} from "../../redux/usersReducer.ts";
import React from "react";
import {Users} from "./Users.tsx";
import {Preloader} from "../common/preloader/Preloader.tsx";

// import {getUsers} from "../../api/api.ts";

class UsersAPIComponent extends React.Component<any, any> {
  componentDidMount() {
    this.props.toggleFetching(true);
    // getUsers(this.props.currentPage, this.props.pageSize).then((data) => {
    //   this.props.setUsers(data.items);
    //   this.props.setTotalCount(data.totalCount);
    //   this.props.toggleFetching(false);
    // });
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
    this.props.toggleFetching(true);
    this.props.setCurrentPage(pageNumber);
    // this.props.toggleFetching(true);
    // getUsers(pageNumber, this.props.pageSize).then((data) => {
    //   this.props.setUsers(data.items);
    //   this.props.setTotalCount(data.totalCount);
    //   this.props.toggleFetching(false);
    // });
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
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          onChangePage={this.onChangePage}
          isFollowing={this.props.isFollowingInProgress}
          toggleFollowing={this.props.toggleFollowing}
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

export const UsersContainer = connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalCount,
  toggleFetching,
  toggleFollowing,
})(UsersAPIComponent);
