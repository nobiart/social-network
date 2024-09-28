import {API} from "./api.ts";

type GetCaptchaResponseType = {
  url: string;
}

export const securityAPI = {
  async getCaptchaUrl() {
    const response = await API.get<GetCaptchaResponseType>("security/get-captcha-url");
    return response.data;
  }
};
