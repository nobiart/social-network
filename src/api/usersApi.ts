import {API, ApiResponseType} from "./api.ts";
import {UserType} from "../redux/usersReducer.ts";

type GetUsersType = {
  items: UserType[],
  totalCount: number,
  error: string | null,
}

export const usersAPI = {
  async getUsers(currentPage: number = 1, pageSize: number = 5) {
    const response = await API.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`);
    return response.data;
  },

  async follow(userId: number) {
    const response = await API.post<ApiResponseType>(`follow/${userId}`);
    return response.data;
  },

  async unfollow(userId: number) {
    const response = await API.delete<ApiResponseType>(`follow/${userId}`);
    return response.data;
  }
};
