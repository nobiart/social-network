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
import {useSearchParams} from "react-router-dom";

type QueryParamsType = {
  term?: string;
  friend?: string;
  page?: string;
}

// @TODO Simplify sync query params

export const Users = () => {
  const totalCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const users = useSelector(getUsersSelector);
  const filter = useSelector(getUsersFilter);
  const isFollowing = useSelector(getFollowingProgress);

  const dispatch: AppDispatch<UsersActionsTypes["type"]> = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query: QueryParamsType = {};

    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    setSearchParams(query);
  }, [filter, currentPage]);

  useEffect(() => {
    let actualPage = currentPage;
    let actualFilter = filter;

    const pageParam = searchParams.get("page");
    const termParam = searchParams.get("term");
    const friendParam = searchParams.get("friend");


    if (!!pageParam) actualPage = Number(pageParam);
    if (!!termParam) actualFilter = {...actualFilter, term: termParam};
    if (!!friendParam) actualFilter = {
      ...actualFilter,
      friend: friendParam === "true" ? true : friendParam === "false" ? false : null,
    };
    dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter)).then();
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
