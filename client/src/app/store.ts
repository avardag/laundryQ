import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import authReducer from "./features/authSlice";
import usersReducer from "./features/usersSlice";
import laundryReducer from "./features/laundrySlice";

// import { newsApiSlice } from "./features/cryptoNews";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    // [authApiSlice.reducerPath]: authApiSlice.reducer,
    auth: authReducer,
    users: usersReducer,
    laundry: laundryReducer,
  },
  // // Adding the api middleware enables caching, invalidation, polling,
  // // and other useful features of `rtk-query`.
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(authApiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
