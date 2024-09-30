import {expect, test, vi, vitest} from "vitest";
import {followThunkCreator, unfollowThunkCreator, usersActions} from "../redux/usersReducer.ts";
import {ApiResponseType, ResultCodesEnum} from "../api/api.ts";
import {usersAPI} from "../api/usersApi.ts";

const successResult: ApiResponseType = {
  data: {},
  resultCode: ResultCodesEnum.SUCCESS,
  messages: []
}

const dispatchMock = vitest.fn();
const getStateMock = vitest.fn();

describe("User API with Thunks (follow)", () => {
  beforeEach(() => {
    vi.spyOn(usersAPI, "follow").mockReturnValue(
      new Promise((resolve) => resolve(successResult))
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  })

  test("Follow User", async () => {
    const followThunk = followThunkCreator(1);
    await followThunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowing(1, true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.follow(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowing(1, false));
  });
});

describe("User API with Thunks (unfollow)", () => {
  beforeEach(() => {
    vi.spyOn(usersAPI, "unfollow").mockReturnValue(
      new Promise((resolve) => resolve(successResult))
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  })

  test("Unfollow User", async () => {
    const unfollowThunk = unfollowThunkCreator(2);
    await unfollowThunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowing(2, true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.unfollow(2));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowing(2, false));
  });
});
