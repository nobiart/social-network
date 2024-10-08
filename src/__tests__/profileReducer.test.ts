import {expect, test} from "vitest";
import {profileActions, profileReducer, ProfileStateType} from "../redux/profileReducer.ts";

const state: ProfileStateType = {
  posts: [
    {id: 1, message: "Hi, how are you?", likes: 12},
    {id: 2, message: "It's OK, thanks!", likes: 1},
    {id: 3, message: "Thanks!", likes: 0},
    {id: 4, message: "My nth Post", likes: 5},
    {id: 5, message: "Hello, World!", likes: 8},
    {id: 6, message: "My New Post 1", likes: 0},
  ],
  profile: null,
  status: "",
  profilePhoto: null,
};

test("Profile Reducer adds post", () => {
  const action = profileActions.addPostActionCreator("My New Post");
  const newState = (profileReducer(state, action));

  expect(newState.posts?.length).toBe(7);
});

test("Profile Reducer post message", () => {
  const action = profileActions.addPostActionCreator("My New Post");
  const newState = (profileReducer(state, action));
  expect(newState.posts![6].message).toBe("My New Post");
});

test("Profile Reducer deletes post", () => {
  const action = profileActions.deletePostActionCreator(1);
  const newState = (profileReducer(state, action));

  expect(newState.posts?.length).toBe(5);
});

test("Profile Reducer doesn't delete post with wrong ID", () => {
  const action = profileActions.deletePostActionCreator(9999);
  const newState = (profileReducer(state, action));

  expect(newState.posts?.length).toBe(6);
});
