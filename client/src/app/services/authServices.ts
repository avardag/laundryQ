import axios from "axios";
import axiosApi, { API_URL } from "../axiosApi";

import { AxiosResponse } from "axios";
import {
  AuthApiResponse,
  LoginRequest,
  SignupRequest,
} from "../features/types";

async function login(
  data: LoginRequest
): Promise<AxiosResponse<AuthApiResponse>> {
  return axiosApi.post<AuthApiResponse>("/users/login", data);
}
async function signup(
  data: SignupRequest
): Promise<AxiosResponse<AuthApiResponse>> {
  return axiosApi.post<AuthApiResponse>("/users/signup", data);
}
async function logout(): Promise<void> {
  return axiosApi.post("/users/logout");
}
//will use default axios instance, because axiosApi has interceptors,
//which will do extra unneeded job at app startup
async function checkAuth(): Promise<AxiosResponse<AuthApiResponse>> {
  return axios.get(`${API_URL}/users/refresh`, { withCredentials: true });
}

export default { login, signup, logout, checkAuth };
