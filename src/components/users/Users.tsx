import {User} from "./user/User.tsx";
import {Pagination} from "../common/pagination/Pagination.tsx";
import {UserType} from "../../redux/usersReducer.ts";

type UsersPropsType = {
  users: UserType[],
  totalCount: number,
  pageSize: number,
  currentPage: number,
  onChangePage: (page: number) => void,
  follow: (id: number) => void,
  unfollow: (id: number) => void,
  isFollowing: number[],
}

export const Users = (
  {
    users,
    totalCount,
    pageSize,
    currentPage,
    onChangePage,
    follow,
    unfollow,
    isFollowing
  }: UsersPropsType) => {
  return (
    <>
      <Pagination
        onChangePage={onChangePage}
        totalItemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          follow={follow}
          unfollow={unfollow}
          isFollowing={isFollowing}
        />
      ))}
    </>
  )
};
