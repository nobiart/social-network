import {User} from "./user/User.tsx";
import s from "./Users.module.css";

export const Users = (props: any) => {
  const pagesCount = Math.ceil(props.totalCount / props.pageSize);
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
              onClick={() => props.onChangePage(p)}
              className={props.currentPage === p ? s.active : ''}
            >
                {p}
              </span>
          )
        })}
      </div>
      {props.users.map((user: any) => (
        <User
          key={user.id}
          user={user}
          follow={props.follow}
          unfollow={props.unfollow}
          isFollowing={props.isFollowingInProgress}
          toggleFollowing={props.toggleFollowing}
        />
      ))}
    </>
  )
};
