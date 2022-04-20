import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  activateLaundry,
  getAllLaundries,
  removeLaundry,
} from "../app/features/laundrySlice";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useAuth } from "../hooks/useAuth";
import Typography from "@mui/material/Typography";
import BookingCard from "./BookingCard";
import LaundryEditCard from "./LaundryEditCard";
import { ApiErrorResponse } from "../types/types";

export default function Laundries() {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const laundries = useAppSelector((state) => state.laundry.laundries);

  useEffect(() => {
    auth.user && dispatch(getAllLaundries());
  }, [auth]);

  const handleLaundryDelete = (id: number) => {
    dispatch(removeLaundry(id))
      .unwrap()
      .then((originalPromiseResult) => {
        // handle result here
        enqueueSnackbar(
          `Laundry ${originalPromiseResult.data.deletedId} removed`,
          {
            variant: "success",
          }
        );
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        enqueueSnackbar(rejectedValueOrSerializedError.message, {
          variant: "error",
        });
      });
  };
  const handleLaundryActivate = (id: number) => {
    dispatch(activateLaundry(id));
  };
  return (
    <div>
      <Typography variant="h6" color="primary" gutterBottom>
        Manage Laundries
      </Typography>
      {laundries &&
        laundries.map((laundry) => (
          <div key={laundry.id}>
            <LaundryEditCard
              laundry={laundry}
              onDelete={handleLaundryDelete}
              onActivate={handleLaundryActivate}
            />
          </div>
        ))}
    </div>
  );
}
