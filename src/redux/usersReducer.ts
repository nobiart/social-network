const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';

const initialState = {
  users: [],
  pageSize: 5,
  totalCount: 0,
  currentPage: 1,
}

export const usersReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u: any) => {
          if (u.id === action.userId) {
            return {...u, followed: true}
          }
          return u;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u: any) => {
          if (u.id === action.userId) {
            return {...u, followed: false}
          }
          return u;
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.pageNumber,
      }
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.count,
      }
    default:
      return state;
  }
};

export const followCreator = (userId: number) => ({type: FOLLOW, userId});
export const unfollowCreator = (userId: number) => ({type: UNFOLLOW, userId});
export const setUsersCreator = (users: any) => ({type: SET_USERS, users});
export const setCurrentPageCreator = (pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber});
export const setTotalCountCreator = (count: number) => ({type: SET_TOTAL_COUNT, count});
