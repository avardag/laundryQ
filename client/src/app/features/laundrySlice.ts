import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { ApiErrorResponse, DeletedResponse } from "../../types/types";
// import type { RootState } from "../store";
// import authServices from "../services/authServices";
import {
  Laundry,
  Machine,
  MachinesApiRes,
  LaundryAddEditApiRes,
  NewMachineApiRes,
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
  Omit<Laundry, "id" | "is_active">, // First argument to the payload creator i.e. what argument takes the function inside:
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
export const updateLaundry = createAsyncThunk<
  LaundryAddEditApiRes, // Return type of the payload creator i.e. what type will be returned as a result
  { laundryData: Omit<Laundry, "id" | "is_active">; laundryId: number }, // First argument to the payload creator i.e. what argument takes the function inside:
  {
    // Optional fields for defining thunkApi field types
    rejectValue: ApiErrorResponse; //type possible errors.
  }
>(`laundry/updateLaundry`, async (data, { getState, rejectWithValue }) => {
  try {
    const res = await laundryServices.updateLaundry(data);

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
export const removeLaundry = createAsyncThunk<
  DeletedResponse, // Return type of the payload creator i.e. what type will be returned as a result
  number, // First argument to the payload creator i.e. what argument takes the function inside:
  {
    // Optional fields for defining thunkApi field types
    rejectValue: ApiErrorResponse; //type possible errors.
  }
>(`laundry/removeLaundry`, async (laundryId, { getState, rejectWithValue }) => {
  try {
    const res = await laundryServices.removeLaundry(laundryId);

    return res.data;
  } catch (err: any) {
    let error: AxiosError<ApiErrorResponse> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return rejectWithValue(error.response.data as ApiErrorResponse);
  }
});
export const activateLaundry = createAsyncThunk<
  LaundryAddEditApiRes, // Return type of the payload creator i.e. what type will be returned as a result
  number, // First argument to the payload creator i.e. what argument takes the function inside:
  {
    // Optional fields for defining thunkApi field types
    rejectValue: ApiErrorResponse; //type possible errors.
  }
>(
  `laundry/activateLaundry`,
  async (laundryId, { getState, rejectWithValue }) => {
    try {
      const res = await laundryServices.activateLaundry(laundryId);

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
export const createMachine = createAsyncThunk<
  NewMachineApiRes, // Return type of the payload creator i.e. what type will be returned as a result
  Omit<Machine, "id">, // First argument to the payload creator i.e. what argument takes the function inside:
  {
    // Optional fields for defining thunkApi field types
    rejectValue: ApiErrorResponse; //type possible errors.
  }
>(`laundry/createMachine`, async (data, { getState, rejectWithValue }) => {
  try {
    const res = await laundryServices.createMachine(data);

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

export const getMachines = createAsyncThunk<MachinesApiRes, number>(
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
        state.errorMessage = "machines could not be fetched";
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
      })
      .addCase(updateLaundry.fulfilled, (state, action) => {
        state.laundries.map((laundry) =>
          laundry.id === action.payload.data.laundry.id
            ? action.payload.data.laundry
            : laundry
        );
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(updateLaundry.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateLaundry.rejected, (state, action) => {
        state.error = true;
        state.errorMessage = action.payload?.message
          ? action.payload?.message
          : "Laundry can't be updated";
        state.loading = false;
      })
      .addCase(removeLaundry.fulfilled, (state, action) => {
        state.laundries.splice(
          state.laundries.findIndex(
            (laundry) => laundry.id === action.payload.data.deletedId
          ),
          1
        );
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(removeLaundry.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(removeLaundry.rejected, (state, action) => {
        state.error = true;
        state.errorMessage = action.payload?.message
          ? action.payload?.message
          : "Laundry can't be deleted";
        state.loading = false;
      })
      .addCase(activateLaundry.fulfilled, (state, action) => {
        state.laundries = state.laundries.map((laundry) => {
          return laundry.id === action.payload.data.laundry.id
            ? { ...laundry, is_active: !laundry.is_active }
            : laundry;
        });
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(activateLaundry.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(activateLaundry.rejected, (state, action) => {
        state.error = true;
        state.errorMessage = action.payload?.message
          ? action.payload?.message
          : "Laundry can't be activated";
        state.loading = false;
      })
      .addCase(createMachine.fulfilled, (state, action) => {
        // state.machinesNew.push(action.payload.data.newMachine);
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(createMachine.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createMachine.rejected, (state, action) => {
        state.error = true;
        state.errorMessage = action.payload?.message
          ? action.payload?.message
          : "Machine can't be added";
        state.loading = false;
      });
  },
});

// export const { logoutOnExpire } = laundrySlice.actions;

export default laundrySlice.reducer;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
