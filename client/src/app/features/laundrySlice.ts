import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { ApiErrorResponse } from "./types";
import type { RootState } from "../store";
import authServices from "../services/authServices";
import {
  Laundry,
  Machine,
  LaundryGetMachinesApiRes,
  BookingNewApiResp,
  BookingRequest,
  Booking,
  Bookings,
  UsersBooking,
  UsersBookings,
  BookingDeletedResponse,
} from "./laundryTypes";
import laundryServices from "../services/laundryServices";

interface LaundryState {
  laundries: Laundry[];
  machines: Machine[];
  bookings: Booking[];
  usersBookings: UsersBooking[];
  error: boolean;
  errorMessage: string;
  loading: boolean;
}
const initialState: LaundryState = {
  laundries: [],
  machines: [],
  bookings: [],
  usersBookings: [],
  error: false,
  errorMessage: "",
  loading: false,
};

export const getAllLaundries = createAsyncThunk(
  `laundry/getAllLaundries`,
  async (_, { rejectWithValue }) => {
    try {
      const res = await laundryServices.getAll();
      return res.data.data;
    } catch (err: any) {
      let error: AxiosError<ApiErrorResponse> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);
export const getMachines = createAsyncThunk<LaundryGetMachinesApiRes, number>(
  `laundry/getMachines`,
  async (laundryId: number, { getState, rejectWithValue }) => {
    try {
      const res = await laundryServices.getMachinesByLaundry(laundryId);
      return res.data;
    } catch (err: any) {
      let error: AxiosError<ApiErrorResponse> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

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
  BookingDeletedResponse, // Return type of the payload creator i.e. what type will be returned as a result
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

const laundrySlice = createSlice({
  name: "laundry",
  initialState,
  reducers: {
    // logoutOnExpire: (state) => {
    //   state.user = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLaundries.fulfilled, (state, action) => {
        state.laundries = action.payload.laundries;
        state.error = false;
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(getAllLaundries.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllLaundries.rejected, (state, action) => {
        state.laundries = [];
        state.error = true;
        state.errorMessage = "laundries could not be fetched";
        state.loading = false;
      })
      .addCase(getMachines.fulfilled, (state, action) => {
        state.machines = action.payload.data.machines;
        state.error = false;
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(getMachines.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getMachines.rejected, (state, action) => {
        state.machines = [];
        state.error = true;
        state.errorMessage = "laundries could not be fetched";
        state.loading = false;
      })
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

// export const { logoutOnExpire } = laundrySlice.actions;

export default laundrySlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
