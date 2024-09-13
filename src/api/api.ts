import axios from "axios";

const BASE_URL = "https://social-network.samuraijs.com/api/1.0/";
const API_KEY = "126291b7-3703-4579-85ac-e0ef08fa09ac";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "API-KEY": API_KEY,
    // Authorization: `Bearer 3f1722b4-4c9d-47f1-bca7-f5ca22fc7326`,
    // "Access-Control-Allow-Credentials": true,
    // "Access-Control-Allow-Origin": "localhost",
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

export const profileAPI = {
  getProfile(userId: number) {
    return api.get(`profile/${userId}`)
      .then(response => response.data);
  },

  getAuth() {
    return api.get("auth/me")
      .then(response => response.data);
  }
};
