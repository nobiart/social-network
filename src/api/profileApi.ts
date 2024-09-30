import {API, ApiResponseType} from "./api.ts";
import {ProfileType} from "../redux/profileReducer.ts";
import {ProfilePhotosType} from "../redux/types.ts";

type PhotosResponseType = {
  photos: ProfilePhotosType;
}

export const profileAPI = {
  async getProfile(userId: number) {
    const response = await API.get<ProfileType>(`profile/${userId}`);

    return response.data;
  },

  async getStatus(userId: number) {
    const response = await API.get<string>(`profile/status/${userId}`);

    return response.data;
  },

  async updateStatus(status: string | null) {
    const response = await API.put<ApiResponseType>("profile/status", {status});

    return response.data;
  },

  async updatePhoto(photo?: File) {
    const response = await API.put<ApiResponseType<PhotosResponseType>>("profile/photo", {photo}, {
      headers: {"Content-Type": "multipart/form-data"}
    });

    return response.data;
  },

  async updateProfile(profile: ProfileType) {
    const response = await API.put<ApiResponseType>("profile", profile);

    return response.data;
  }
};
