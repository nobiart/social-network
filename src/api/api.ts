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
  async getUsers(currentPage: number = 1, pageSize: number = 5) {
    const response = await api.get(`users?page=${currentPage}&count=${pageSize}`);
    return response.data;
  },

  async follow(userId: string) {
    const response = await api.post(`follow/${userId}`);
    return response.data;
  },

  async unfollow(userId: string) {
    const response = await api.delete(`follow/${userId}`);
    return response.data;
  }
};

export const profileAPI = {
  async getProfile(userId: number) {
    const response = await api.get(`profile/${userId}`);
    return response.data;
  },

  async getStatus(userId: number) {
    const response = await api.get(`profile/status/${userId}`);
    return response.data;
  },

  async updateStatus(status: any) {
    const response = await api.put("profile/status", {status});
    return response.data;
  },

  async updatePhoto(photo: File) {
    const response = await api.put("profile/photo", {photo}, {
      headers: {"Content-Type": "multipart/form-data"}
    });

    return response.data;
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
