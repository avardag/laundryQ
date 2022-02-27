import { axiosApi } from "../axiosApi";

import { AxiosResponse } from "axios";
import { UsersApiResponse } from "../../types/types";

async function getUsers(): Promise<AxiosResponse<UsersApiResponse>> {
  return axiosApi.get<UsersApiResponse>("/users");
}

export default { getUsers };
