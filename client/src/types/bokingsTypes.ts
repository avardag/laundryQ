import { ApiResponse } from "./types";

export interface Booking {
  id: number;
  dateTimeFrom: number;
  dateTimeTill: number;
  machineId: number;
  userId: number;
  userFirstName: string;
  userLastName: string;
}

export interface UsersBooking {
  id: number;
  pin: string;
  dateTimeFrom: string;
  dateTimeTill: string;
  createdAt: string;
  machineId: number;
  size: number;
  number: number;
  name: string;
  address: string;
}
export type BookingRequest = Omit<Booking, "id">;

export interface BookingNewApiResp extends ApiResponse {
  data: {
    booking: Booking;
  };
}
export interface Bookings extends ApiResponse {
  data: {
    bookings: Booking[];
  };
}
export interface UsersBookings extends ApiResponse {
  data: {
    bookings: UsersBooking[];
  };
}
export interface BookingDeletedResponse extends ApiResponse {
  data: {
    deletedId: number;
  };
}
