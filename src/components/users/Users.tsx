import {User} from "./user/User.tsx";
import {Pagination} from "../common/pagination/Pagination.tsx";
import {
  followThunkCreator,
  getUsersThunkCreator,
  unfollowThunkCreator,
  UsersActionsTypes,
  UsersFilterType,
} from "../../redux/usersReducer.ts";
import {UsersSearchForm} from "./UsersSearchForm.tsx";
import {useDispatch, useSelector} from "react-redux";
import {
  getCurrentPage,
  getFollowingProgress,
  getPageSize,
  getTotalUsersCount,
  getUsersFilter,
  getUsersSelector
} from "../../redux/usersSelectors.ts";
import {AppDispatch} from "../../redux/reduxStore.ts";
import {useEffect} from "react";

export const Users = () => {
  const totalCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const users = useSelector(getUsersSelector);
  const filter = useSelector(getUsersFilter);
  const isFollowing = useSelector(getFollowingProgress);

  const dispatch: AppDispatch<UsersActionsTypes["type"]> = useDispatch();

  useEffect(() => {
    dispatch(getUsersThunkCreator(currentPage, pageSize, filter)).then();
  }, []);

  const onChangePage = (pageNumber: number) => {
    dispatch(getUsersThunkCreator(pageNumber, pageSize, filter)).then();
  }

  const onChangeFilter = (filter: UsersFilterType) => {
    dispatch(getUsersThunkCreator(1, pageSize, filter)).then();
  }

  const follow = (userId: number) => {
    dispatch(followThunkCreator(userId)).then();
  }

  const unfollow = (userId: number) => {
    dispatch(unfollowThunkCreator(userId)).then();
  }

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
