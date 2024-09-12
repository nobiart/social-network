import axios from "axios";

const BASE_URL = "https://social-network.samuraijs.com/api/1.0/";
const API_KEY = "3370cfb8-72a3-4899-97f2-265767d19567";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "API-KEY": API_KEY,
  }
})

export const getUsers = (currentPage: number = 1, pageSize: number = 5) => {
  return api.get(`users?page=${currentPage}&count=${pageSize}`)
    .then(response => response.data);
};

export const followHandler = (userId: number) => {
  return api.post(`follow/${userId}`)
    .then(response => response.data);
};

export const unfollowHandler = (userId: number) => {
  return api.delete(`follow/${userId}`)
    .then(response => response.data);
};
