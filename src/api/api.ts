import axios from "axios";

const BASE_URL = "https://social-network.samuraijs.com/api/1.0/";
const API_KEY = "126291b7-3703-4579-85ac-e0ef08fa09ac";

export const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "API-KEY": API_KEY,
  }
});

export enum ResultCodesEnum {
  SUCCESS = 0,
  ERROR = 1,
  CAPTCHA = 10,
}

export type ApiResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D;
  resultCode: RC,
  messages: string[],
}
