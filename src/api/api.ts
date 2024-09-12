import axios from "axios";

const BASE_URL = "https://social-network.samuraijs.com/api/1.0/";
const API_KEY = "340e38b5-f891-410b-a067-61af4c377627";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "API-KEY": API_KEY,
  }
});

export const usersAPI = {
  getUsers(currentPage: number = 1, pageSize: number = 5) {
    return api.get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data);
  },

  follow(userId: number) {
    return api.post(`follow/${userId}`)
      .then(response => response.data);
  },

  unfollow(userId: number) {
    return api.delete(`follow/${userId}`)
      .then(response => response.data);
  }
};
