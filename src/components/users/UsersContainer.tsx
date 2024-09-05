import {connect} from "react-redux";
import {
  followCreator,
  setCurrentPageCreator,
  setTotalCountCreator,
  setUsersCreator,
  toggleFetchingCreator,
  unfollowCreator
} from "../../redux/usersReducer.ts";
import React from "react";
import {Users} from "./Users.tsx";
import {Preloader} from "../common/preloader/Preloader.tsx";

// import axios from "axios";

class UsersAPIComponent extends React.Component<any, any> {
  componentDidMount() {
    this.props.toggleFetching(true);
    // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
    //    .then((res) => {
    //      this.props.setUsers(res.data.items);
    //      this.props.setTotalCount(res.data.totalCount);
    //      this.props.toggleFetching(false);
    //    });
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
    this.props.toggleFetching(true);
    // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
    //    .then((res) => {
    //      this.props.setUsers(res.data.items);
    //      this.props.setTotalCount(res.data.totalCount);
    //      this.props.toggleFetching(false);
    //    });
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
    },
    toggleFetching: (isFetching: boolean) => {
      dispatch(toggleFetchingCreator(isFetching));
    }
  }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);
