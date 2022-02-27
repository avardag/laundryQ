import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types";
// import type { RootState } from "../store";
// import authServices from "../services/authServices";
import {
  Laundry,
  Machine,
  LaundryGetMachinesApiRes,
  LaundryAddEditApiRes,
} from "../../types/laundryTypes";
import laundryServices from "../services/laundryServices";

interface LaundryState {
  laundries: Laundry[];
  machines: Machine[];
  error: boolean;
  errorMessage: string;
  loading: boolean;
}
const initialState: LaundryState = {
  laundries: [],
  machines: [],
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

export const createLaundry = createAsyncThunk<
  LaundryAddEditApiRes, // Return type of the payload creator i.e. what type will be returned as a result
  Omit<Laundry, "id" | "isActive">, // First argument to the payload creator i.e. what argument takes the function inside:
  {
    // Optional fields for defining thunkApi field types
    rejectValue: ApiErrorResponse; //type possible errors.
  }
>(`laundry/createLaundry`, async (data, { getState, rejectWithValue }) => {
  try {
    const res = await laundryServices.createLaundry(data);

    return res.data;
  } catch (err: any) {
    let error: AxiosError<ApiErrorResponse> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return rejectWithValue(error.response.data);
  }
});

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
      .addCase(createLaundry.fulfilled, (state, action) => {
        state.laundries.push(action.payload.data.laundry);
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(createLaundry.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createLaundry.rejected, (state, action) => {
        state.error = true;
        state.errorMessage = action.payload?.message
          ? action.payload?.message
          : "Laundry can't be added";
        state.loading = false;
      });
  },
});

// export const { logoutOnExpire } = laundrySlice.actions;

export default laundrySlice.reducer;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
