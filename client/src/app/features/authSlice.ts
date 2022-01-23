import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type {
  ApiErrorResponse,
  AuthApiResponse,
  LoginRequest,
  SignupRequest,
  User,
} from "./types";
import type { RootState } from "../store";
import authServices from "../services/authServices";

interface AuthState {
  user: User | null;
  error: boolean;
  errorMessage: string;
  loading: boolean;
}
const initialState: AuthState = {
  user: null,
  error: false,
  errorMessage: "",
  loading: false,
};
export const login = createAsyncThunk<
  AuthApiResponse, // Return type of the payload creator i.e. what type will be returned as a result
  LoginRequest, // First argument to the payload creator i.e. what argument takes the function inside:
  {
    // Optional fields for defining thunkApi field types
    rejectValue: ApiErrorResponse; //type possible errors.
  }
>(`auth/login`, async (data: LoginRequest, { getState, rejectWithValue }) => {
  console.log("hit login thunk");

  const state = getState() as RootState;
  try {
    const res = await authServices.login(data);

    localStorage.setItem("accessToken", res.data.user.accessToken);

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

export const signup = createAsyncThunk<
  AuthApiResponse,
  SignupRequest,
  {
    rejectValue: ApiErrorResponse;
  }
>(`auth/signup`, async (data: SignupRequest, { getState, rejectWithValue }) => {
  const state = getState() as RootState;

  try {
    const res = await authServices.signup(data);
    localStorage.setItem("accessToken", res.data.user.accessToken);
    return res.data;
  } catch (err: any) {
    let error: AxiosError<ApiErrorResponse> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk(
  `auth/logout`,
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("accessToken");
      await authServices.logout();
    } catch (err: any) {
      let error: AxiosError<ApiErrorResponse> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);
export const checkAuthOnAppStart = createAsyncThunk(
  `auth/checkAuth`,
  async (_, { rejectWithValue }) => {
    try {
      const res = await authServices.checkAuth();
      localStorage.setItem("accessToken", res.data.user.accessToken);
      return res.data;
    } catch (err: any) {
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(err.response.data as ApiErrorResponse);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutOnExpire: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        checkAuthOnAppStart.fulfilled,
        (state, action: PayloadAction<AuthApiResponse>) => {
          state.user = action.payload.user;
          state.error = false;
          state.errorMessage = "";
          state.loading = false;
        }
      )
      .addCase(checkAuthOnAppStart.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(checkAuthOnAppStart.rejected, (state, action) => {
        state.user = null;
        state.error = true;
        state.errorMessage = "User not logged in";
        state.loading = false;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthApiResponse>) => {
          state.user = action.payload.user;
          state.error = false;
          state.errorMessage = "";
          state.loading = false;
        }
      )
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.rejected, (state, action) => {
        // console.log(action.payload?.);
        state.error = true;
        state.errorMessage = action.payload?.message
          ? action.payload?.message
          : "";
        state.loading = false;
      })

      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = false;
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = true;
        state.errorMessage = action.payload?.message
          ? action.payload?.message
          : "";
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = false;
        state.errorMessage = "";
        state.loading = false;
      });
  },
});

export const { logoutOnExpire } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
