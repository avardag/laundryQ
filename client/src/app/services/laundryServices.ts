import axios from "axios";
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

import {
  BookingNewApiResp,
  BookingRequest,
  Bookings,
  UsersBookings,
} from "../../types/bokingsTypes";
import { DeletedResponse } from "../../types/types";
async function getAll(): Promise<AxiosResponse<LaundryAllApiResponse>> {
  return axiosApi.get<LaundryAllApiResponse>("/laundry");
}
async function getMachinesByLaundry(
  laundryId: number
): Promise<AxiosResponse<MachinesApiRes>> {
  return axiosApi.get<MachinesApiRes>(`/laundry/machines/${laundryId}`);
}

async function createBooking(
  data: BookingRequest
): Promise<AxiosResponse<BookingNewApiResp>> {
  return axiosApi.post<BookingNewApiResp>("/laundry/bookings", data);
}
async function getBookingsByLaundry(
  laundryId: number
): Promise<AxiosResponse<Bookings>> {
  return axiosApi.get<Bookings>(`/laundry/bookings/laundry/${laundryId}`);
}
async function getBookingsByUser(
  userId: number
): Promise<AxiosResponse<UsersBookings>> {
  return axiosApi.get<UsersBookings>(`/laundry/bookings/user/${userId}`);
}
async function removeBooking(
  bookingId: number
): Promise<AxiosResponse<DeletedResponse>> {
  return axiosApi.delete<DeletedResponse>(`/laundry/bookings/${bookingId}`);
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
async function createMachine(
  data: Omit<Machine, "id">
): Promise<AxiosResponse<NewMachineApiRes>> {
  return axiosApi.post<NewMachineApiRes>(`/laundry/machines`, data);
}
export default {
  getAll,
  getMachinesByLaundry,
  createBooking,
  getBookingsByLaundry,
  getBookingsByUser,
  removeBooking,
  createLaundry,
  removeLaundry,
  createMachine,
};
