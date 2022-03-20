import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";

import RequireAuth from "./utils/RequireAuth";
import { useAppSelector, useAppDispatch } from "./app/store";
import { checkAuthOnAppStart } from "./app/features/authSlice";

import MyBookings from "./components/MyBookings";
import MyLaundry from "./components/MyLaundry";
import MyInfo from "./components/MyInfo";
import Layout from "./components/Layout";
import CircularLoading from "./components/CircularLoading";
import Laundry from "./pages/Laundry";
import Laundries from "./components/Laundries";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setLoading(true);
      dispatch(checkAuthOnAppStart()).then((data) => {
        setLoading(false);
      });
    }
  }, []);
  if (loading) return <CircularLoading />;
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/users"
            element={
              <RequireAuth>
                <Users />
              </RequireAuth>
            }
          />
          <Route
            path="/laundry"
            element={
              <RequireAuth>
                <Laundry />
              </RequireAuth>
            }
          />
          <Route
            path="/bookings"
            element={
              <RequireAuth>
                <Bookings />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          >
            <Route path="my-bookings" element={<MyBookings />} />
            <Route path="my-laundry" element={<MyLaundry />} />
            <Route path="my-info" element={<MyInfo />} />
            <Route path="laundries" element={<Laundries />} />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
