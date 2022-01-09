import axiosApi from "../axiosApi";

import { AxiosResponse } from "axios";
import { UsersApiResponse } from "../features/types";

async function getUsers(): Promise<AxiosResponse<UsersApiResponse>> {
  return axiosApi.get<UsersApiResponse>("/users");
}

export default { getUsers };
