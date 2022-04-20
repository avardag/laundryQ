import { axiosApi, API_URL } from "../axiosApi";

import { AxiosResponse } from "axios";

import {
  Laundry,
  LaundryAddEditApiRes,
  LaundryAllApiResponse,
  MachinesApiRes,
  Machine,
  NewMachineApiRes,
} from "../../types/laundryTypes";

import { DeletedResponse } from "../../types/types";
async function getAll(): Promise<AxiosResponse<LaundryAllApiResponse>> {
  return axiosApi.get<LaundryAllApiResponse>("/laundry");
}
async function getMachinesByLaundry(
  laundryId: number
): Promise<AxiosResponse<MachinesApiRes>> {
  return axiosApi.get<MachinesApiRes>(`/laundry/machines/${laundryId}`);
}

async function createLaundry(
  data: Omit<Laundry, "id" | "is_active">
): Promise<AxiosResponse<LaundryAddEditApiRes>> {
  return axiosApi.post<LaundryAddEditApiRes>(`/laundry`, data);
}
async function removeLaundry(
  laundryId: number
): Promise<AxiosResponse<DeletedResponse>> {
  return axiosApi.delete<DeletedResponse>(`/laundry/${laundryId}`);
}
async function activateLaundry(
  laundryId: number
): Promise<AxiosResponse<LaundryAddEditApiRes>> {
  return axiosApi.post<LaundryAddEditApiRes>(`/laundry/activate/${laundryId}`);
}
async function createMachine(
  data: Omit<Machine, "id">
): Promise<AxiosResponse<NewMachineApiRes>> {
  return axiosApi.post<NewMachineApiRes>(`/laundry/machines`, data);
}

async function removeMachine(
  id: number
): Promise<AxiosResponse<DeletedResponse>> {
  return axiosApi.post<DeletedResponse>(`/laundry/machines/${id}`);
}

export default {
  getAll,
  getMachinesByLaundry,
  createLaundry,
  removeLaundry,
  createMachine,
  activateLaundry,
  removeMachine,
};
