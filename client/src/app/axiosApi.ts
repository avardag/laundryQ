import axios from "axios";
import { AuthApiResponse } from "./features/types";

// export const API_URL = "http://localhost:5000/api/v1";
export const API_URL = "/api";
const axiosApi = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
//interceptor for request. Sets Auth Bearer as accessToken from localStorage
axiosApi.interceptors.request.use((config) => {
  if (config?.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
  }
  return config;
}); //interceptor for response. On error sends request to renew the token
axiosApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && err.config && !err.config._isRetry) {
      originalRequest._isRetry = true; //set the key, so req dont cycle infinitely
      try {
        const response = await axios.get<AuthApiResponse>(
          `${API_URL}/users/refresh`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem(
          "accessToken",
          response.data.data.tokens.accessToken
        );
        return axiosApi.request(originalRequest);
      } catch (e) {
        //TODO: do logout
        console.log("Not authorized");
        throw e;
      }
    }
    throw err; //code didnt pass from if clause, or err is not 401, throw that error
  }
);

export default axiosApi;
