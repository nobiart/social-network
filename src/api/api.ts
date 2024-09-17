import axios from "axios";

const BASE_URL = "https://social-network.samuraijs.com/api/1.0/";
const API_KEY = "126291b7-3703-4579-85ac-e0ef08fa09ac";

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

export const profileAPI = {
  getProfile(userId: number) {
    return api.get(`profile/${userId}`)
      .then(response => response.data);
  },

  getStatus(userId: number) {
    return api.get(`profile/status/${userId}`)
      .then(response => response.data);
  },

  updateStatus(status: any) {
    return api.put("profile/status", {status})
      .then(response => response.data);
  }
};

export const authAPI = {
  async me() {
    const response = await api.get("auth/me");
    return response.data;
  },

  async login(email: string, password: string, rememberMe: boolean = false) {
    const response = await api.post("auth/login", {email, password, rememberMe});
    return response.data;
  },

  async logout() {
    const response = await api.delete("auth/login");
    return response.data;
  },
}
