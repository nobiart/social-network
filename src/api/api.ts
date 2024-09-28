import axios from "axios";

export enum ResultCodesEnum {
  SUCCESS = 0,
  ERROR = 1,
  CAPTCHA = 10,
}

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

  async follow(userId: number) {
    const response = await api.post(`follow/${userId}`);
    return response.data;
  },

  async unfollow(userId: number) {
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

  async updateStatus(status: string | null) {
    const response = await api.put("profile/status", {status});
    return response.data;
  },

  async updatePhoto(photo: File) {
    const response = await api.put("profile/photo", {photo}, {
      headers: {"Content-Type": "multipart/form-data"}
    });

    return response.data;
  },

  async updateProfile(formData: any) {
    const response = await api.put("profile", formData);

    return response.data;
  }
};

type MeResponseType = {
  data: {
    id: number,
    email: string,
    login: string,
  },
  resultCode: ResultCodesEnum,
  messages: string[],
}

type LoginRequestType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captchaUrl: string | null,
}

type LoginResponseType = {
  data: {
    userId: number,
  }
  resultCode: ResultCodesEnum,
  messages: string[],
}

export const authAPI = {
  async me() {
    const response = await api.get<MeResponseType>("auth/me");
    return response.data;
  },

  async login({email, password, rememberMe = false, captchaUrl}: LoginRequestType) {
    const response = await api.post<LoginResponseType>("auth/login", {
      email,
      password,
      rememberMe,
      captcha: captchaUrl
    });
    return response.data;
  },

  async logout() {
    const response = await api.delete("auth/login");
    return response.data;
  },
};

export const securityAPI = {
  async getCaptchaUrl() {
    const response = await api.get("security/get-captcha-url");
    return response.data;
  }
};
