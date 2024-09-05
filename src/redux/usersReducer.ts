const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

const initialState = {
  users: [],
}

export const usersReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return {...u, followed: true}
          }
          return u;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return {...u, followed: false}
          }
          return u;
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      }
    default:
      return state;
  }
};

export const followCreator = (userId: number) => ({type: FOLLOW, userId});
export const unfollowCreator = (userId: number) => ({type: UNFOLLOW, userId});
export const setUsersCreator = (users: any) => ({type: SET_USERS, users});
