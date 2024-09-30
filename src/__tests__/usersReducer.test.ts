import {expect, test} from "vitest";
import {usersActions, usersReducer, UsersStateType} from "../redux/usersReducer.ts";

let state: UsersStateType;

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: "Dima 0",
        status: "status 0",
        photos: {
          small: null,
          large: null
        },
        followed: false
      },
      {
        id: 1,
        name: "Dima 1",
        status: "status 1",
        photos: {
          small: null,
          large: null
        },
        followed: false
      },
      {
        id: 2,
        name: "Dima 2",
        status: "status 2",
        photos: {
          small: null,
          large: null
        },
        followed: true
      },
      {
        id: 3,
        name: "Dima 3",
        status: "status 3",
        photos: {
          small: null,
          large: null
        },
        followed: true
      }
    ],
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: [],
  }
})

test("Follow User Success", () => {
  const newState = usersReducer(state, usersActions.follow(1));
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});

test("Unfollow User Success", () => {
  const newState = usersReducer(state, usersActions.unfollow(3));
  expect(newState.users[2].followed).toBeTruthy();
  expect(newState.users[3].followed).toBeFalsy();
});
