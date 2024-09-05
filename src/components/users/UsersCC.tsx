import {User} from "./user/User.tsx";
import React from "react";
import s from './Users.module.css';

// import axios from "axios";

export class UsersCC extends React.Component<any, any> {
  componentDidMount() {
    // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
    //    .then((res) => {
    //      this.props.setUsers(res.data.items);
    //      this.props.setTotalCount(res.data.totalCount);
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
  }

  onChangePage = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
    //    .then((res) => {
    //      this.props.setUsers(res.data.items);
    //      this.props.setTotalCount(res.data.totalCount);
    //    });
  }

  render() {
    const pagesCount = Math.ceil(this.props.totalCount / this.props.pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    return (
      <>
        <div className={s.pagination}>
          {pages.map(p => {
            return (
              <span
                key={p}
                onClick={() => this.onChangePage(p)}
                className={this.props.currentPage === p ? s.active : ''}
              >
                {p}
              </span>
            )
          })}
        </div>
        {this.props.users.map((user) => (
          <User
            key={user.id}
            user={user}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
          />
        ))}
      </>
    )
  }
}
