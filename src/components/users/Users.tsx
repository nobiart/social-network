import {User} from "./user/User.tsx";
import {Pagination} from "../common/pagination/Pagination.tsx";

interface IUsersProps {
  users: any,
  totalCount: number,
  pageSize: number,
  currentPage: number,
  onChangePage: (page: number) => void,
  follow: (id: number) => void,
  unfollow: (id: number) => void,
  isFollowing: number[],
}

export const Users = ({
                        users,
                        totalCount,
                        pageSize,
                        currentPage,
                        onChangePage,
                        follow,
                        unfollow,
                        isFollowing
                      }: IUsersProps) => {
  return (
    <>
      <Pagination
        onChangePage={onChangePage}
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
      {users.map((user: any) => (
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
