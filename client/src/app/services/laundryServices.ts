import axios from "axios";
import { axiosApi, API_URL } from "../axiosApi";

import { AxiosResponse } from "axios";

import {
  Laundry,
  LaundryAddEditApiRes,
  LaundryAllApiResponse,
  LaundryGetMachinesApiRes,
} from "../../types/laundryTypes";

import {
  BookingDeletedResponse,
  BookingNewApiResp,
  BookingRequest,
  Bookings,
  UsersBookings,
} from "../../types/bokingsTypes";
async function getAll(): Promise<AxiosResponse<LaundryAllApiResponse>> {
  return axiosApi.get<LaundryAllApiResponse>("/laundry");
}
async function getMachinesByLaundry(
  laundryId: number
): Promise<AxiosResponse<LaundryGetMachinesApiRes>> {
  return axiosApi.get<LaundryGetMachinesApiRes>(
    `/laundry/machines/${laundryId}`
  );
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
): Promise<AxiosResponse<BookingDeletedResponse>> {
  return axiosApi.delete<BookingDeletedResponse>(
    `/laundry/bookings/${bookingId}`
  );
}
async function createLaundry(
  data: Omit<Laundry, "id" | "isActive">
): Promise<AxiosResponse<LaundryAddEditApiRes>> {
  return axiosApi.post<LaundryAddEditApiRes>(`/laundry`);
}
export default {
  getAll,
  getMachinesByLaundry,
  createBooking,
  getBookingsByLaundry,
  getBookingsByUser,
  removeBooking,
  createLaundry,
};
