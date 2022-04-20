import { axiosApi, API_URL } from "../axiosApi";

import { AxiosResponse } from "axios";

import {
  BookingNewApiResp,
  BookingRequest,
  Bookings,
  UsersBookings,
} from "../../types/bokingsTypes";
import { DeletedResponse } from "../../types/types";

async function createBooking(
  data: BookingRequest
): Promise<AxiosResponse<BookingNewApiResp>> {
  return axiosApi.post<BookingNewApiResp>("/bookings", data);
}
async function getBookingsByLaundry(
  laundryId: number
): Promise<AxiosResponse<Bookings>> {
  return axiosApi.get<Bookings>(`/bookings/laundry/${laundryId}`);
}
async function getBookingsByUser(
  userId: number
): Promise<AxiosResponse<UsersBookings>> {
  return axiosApi.get<UsersBookings>(`/bookings/user/${userId}`);
}
async function removeBooking(
  bookingId: number
): Promise<AxiosResponse<DeletedResponse>> {
  return axiosApi.delete<DeletedResponse>(`/bookings/${bookingId}`);
}

export default {
  createBooking,
  getBookingsByLaundry,
  getBookingsByUser,
  removeBooking,
};
