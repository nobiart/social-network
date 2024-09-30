import {User} from "./user/User.tsx";
import {Pagination} from "../common/pagination/Pagination.tsx";
import {UsersFilterType, UserType} from "../../redux/usersReducer.ts";
import {UsersSearchForm} from "./UsersSearchForm.tsx";

type UsersPropsType = {
  users: UserType[],
  totalCount: number,
  pageSize: number,
  currentPage: number,
  onChangePage: (page: number) => void,
  onChangeFilter: (filter: UsersFilterType) => void,
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
    onChangeFilter,
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
      <UsersSearchForm onChangeFilter={onChangeFilter}/>
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
