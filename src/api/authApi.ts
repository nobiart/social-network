import {API, ApiResponseType} from "./api.ts";

type MeResponseDataType = {
  id: number,
  email: string,
  login: string,
}

type LoginRequestType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captchaUrl: string | null,
}

type LoginResponseDataType = {
  userId: number,
}

export const authAPI = {
  async me() {
    const response = await API.get<ApiResponseType<MeResponseDataType>>("auth/me");
    return response.data;
  },

  async login({email, password, rememberMe = false, captchaUrl}: LoginRequestType) {
    const response = await API.post<ApiResponseType<LoginResponseDataType>>("auth/login", {
      email,
      password,
      rememberMe,
      captcha: captchaUrl
    });
    return response.data;
  },

  async logout() {
    const response = await API.delete<ApiResponseType>("auth/login");
    return response.data;
  },
};
