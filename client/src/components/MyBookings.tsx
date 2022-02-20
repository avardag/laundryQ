import React, { useEffect } from "react";
import { getUsersBookings, removeBooking } from "../app/features/laundrySlice";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useAuth } from "../hooks/useAuth";
import Typography from "@mui/material/Typography";
import BookingCard from "./BookingCard";

export default function MyBookings() {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const bookings = useAppSelector((state) => state.laundry.usersBookings);
  useEffect(() => {
    auth.user && dispatch(getUsersBookings(auth.user.id));
  }, [auth]);
  const onDelete = (id: number) => {
    dispatch(removeBooking(id));
  };
  return (
    <div>
      <Typography variant="h6" color="primary" gutterBottom>
        Manage Bookings
      </Typography>
      {bookings &&
        bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} onDelete={onDelete} />
        ))}
    </div>
  );
}
