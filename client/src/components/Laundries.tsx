import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllLaundries } from "../app/features/laundrySlice";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useAuth } from "../hooks/useAuth";
import Typography from "@mui/material/Typography";
import BookingCard from "./BookingCard";

export default function Laundries() {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const laundries = useAppSelector((state) => state.laundry.laundries);
  useEffect(() => {
    auth.user && dispatch(getAllLaundries());
  }, [auth]);

  return (
    <div>
      <Typography variant="h6" color="primary" gutterBottom>
        Manage Laundries
      </Typography>
      {laundries &&
        laundries.map((laundry) => (
          <div key={laundry.id}>
            <Link to="/laundry" state={{ id: laundry.id }}>
              {laundry.name}
            </Link>
          </div>
        ))}
    </div>
  );
}
