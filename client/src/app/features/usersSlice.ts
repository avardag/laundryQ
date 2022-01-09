import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { ApiErrorResponse, UsersApiResponse, Tokens, User } from "./types";
import type { RootState } from "../store";
import userServices from "../services/userServices";

interface UsersState {
  users: User[];
  error: boolean;
  errorMessage: string;
  loading: boolean;
}
const initialState: UsersState = {
  users: [],
  error: false,
  errorMessage: "",
  loading: false,
};
export const fetchAllUsers = createAsyncThunk<
  UsersApiResponse, // Return type of the payload creator i.e. what type will be returned as a result
  void, // First argument to the payload creator i.e. what argument takes the function inside:
  {
    // Optional fields for defining thunkApi field types
    rejectValue: ApiErrorResponse; //type possible errors.
  }
>(`users/fetchAll`, async (_, { rejectWithValue }) => {
  try {
    const res = await userServices.getUsers();
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

const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.data.users;
        state.error = false;
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.error = true;
        state.errorMessage = action.payload?.message
          ? action.payload?.message
          : "";
        state.loading = false;
        state.users = [];
      });
  },
});

// export const { logout } = users.actions;

export default users.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
