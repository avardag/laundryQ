import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { ApiErrorResponse, DeletedResponse } from "../../types/types";
// import type { RootState } from "../store";
import {
  BookingNewApiResp,
  BookingRequest,
  Booking,
  Bookings,
  UsersBooking,
  UsersBookings,
} from "../../types/bokingsTypes";
import laundryServices from "../services/laundryServices";

interface BookingsState {
  bookings: Booking[];
  usersBookings: UsersBooking[];
  error: boolean;
  errorMessage: string;
  loading: boolean;
}
const initialState: BookingsState = {
  bookings: [],
  usersBookings: [],
  error: false,
  errorMessage: "",
  loading: false,
};

export const createBooking = createAsyncThunk<
  BookingNewApiResp, // Return type of the payload creator i.e. what type will be returned as a result
  BookingRequest, // First argument to the payload creator i.e. what argument takes the function inside:
  {
    // Optional fields for defining thunkApi field types
    rejectValue: ApiErrorResponse; //type possible errors.
  }
>(
  `laundry/createBooking`,
  async (data: BookingRequest, { getState, rejectWithValue }) => {
    try {
      const res = await laundryServices.createBooking(data);

      return res.data;
    } catch (err: any) {
      let error: AxiosError<ApiErrorResponse> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data);
    }
  }
);
export const getBookings = createAsyncThunk<
  Bookings, // Return type of the payload creator i.e. what type will be returned as a result
  number, // First argument to the payload creator i.e. what argument takes the function inside:
  {
    // Optional fields for defining thunkApi field types
    rejectValue: ApiErrorResponse; //type possible errors.
  }
>(
  `laundry/getBookings`,
  async (laundryId: number, { getState, rejectWithValue }) => {
    try {
      const res = await laundryServices.getBookingsByLaundry(laundryId);

      return res.data;
    } catch (err: any) {
      let error: AxiosError<ApiErrorResponse> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUsersBookings = createAsyncThunk<
  UsersBookings, // Return type of the payload creator i.e. what type will be returned as a result
  number, // First argument to the payload creator i.e. what argument takes the function inside:
  {
    // Optional fields for defining thunkApi field types
    rejectValue: ApiErrorResponse; //type possible errors.
  }
>(
  `laundry/getUsersBookings`,
  async (userId: number, { getState, rejectWithValue }) => {
    try {
      const res = await laundryServices.getBookingsByUser(userId);

      return res.data;
    } catch (err: any) {
      let error: AxiosError<ApiErrorResponse> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeBooking = createAsyncThunk<
  DeletedResponse, // Return type of the payload creator i.e. what type will be returned as a result
  number, // First argument to the payload creator i.e. what argument takes the function inside:
  {
    // Optional fields for defining thunkApi field types
    rejectValue: ApiErrorResponse; //type possible errors.
  }
>(
  `laundry/removeBooking`,
  async (bookingId: number, { getState, rejectWithValue }) => {
    try {
      const res = await laundryServices.removeBooking(bookingId);

      return res.data;
    } catch (err: any) {
      let error: AxiosError<ApiErrorResponse> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data);
    }
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    // logoutOnExpire: (state) => {
    //   state.user = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings = [...state.bookings, action.payload.data.booking];
        state.error = false;
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(createBooking.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createBooking.rejected, (state, action) => {
        // state.bookings = [];
        state.error = true;
        state.errorMessage = action.payload?.message
          ? action.payload?.message
          : "Booking cant be added";
        state.loading = false;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.bookings = action.payload.data.bookings;
        state.error = false;
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(getBookings.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.error = true;
        state.errorMessage = action.payload?.message
          ? action.payload?.message
          : "Booking cant be fetched";
        state.loading = false;
      })
      .addCase(getUsersBookings.fulfilled, (state, action) => {
        state.usersBookings = action.payload.data.bookings;
        state.error = false;
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(getUsersBookings.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUsersBookings.rejected, (state, action) => {
        state.error = true;
        state.errorMessage = action.payload?.message
          ? action.payload?.message
          : "Bookings cant be fetched";
        state.loading = false;
      })
      .addCase(removeBooking.fulfilled, (state, action) => {
        state.usersBookings = state.usersBookings.filter(
          (booking) => booking.id !== action.payload.data.deletedId
        );
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(removeBooking.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(removeBooking.rejected, (state, action) => {
        state.error = true;
        state.errorMessage = action.payload?.message
          ? action.payload?.message
          : "Bookings cant be deleted";
        state.loading = false;
      });
  },
});

// export const { logoutOnExpire } = bookingsSlice.actions;

export default bookingsSlice.reducer;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
