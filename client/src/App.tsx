import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Users from "./pages/Users";

import RequireAuth from "./utils/RequireAuth";
import { useAppSelector, useAppDispatch } from "./app/store";
import { checkAuthOnAppStart, logout } from "./app/features/authSlice";
import { User } from "./app/features/types";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  // console.log("user in App.tsx: ", user);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(checkAuthOnAppStart());
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout user={user} />}>
          <Route path="/" element={<PublicPage />} />
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
            path="/protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

function Layout({ user }: { user: User | null }) {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const onLogoutButton = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div>
      {user ? (
        <p>You are loged in as {`${user.firstName}`} </p>
      ) : (
        <Link to="/login">Login Here</Link>
      )}
      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
        <li>
          <Link to="/users">All Users</Link>
        </li>
      </ul>

      <div>{user && <button onClick={onLogoutButton}>Logout</button>}</div>
      <Outlet />
    </div>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

export default App;
