import Box from "@mui/material/Box";
import { useAppDispatch } from "../app/store";
import { useNavigate, Outlet } from "react-router-dom";
import { User } from "../types/types";
import { logout } from "../app/features/authSlice";
import MenuAppBar from "./AppBar";
import Footer from "./Footer";

export default function Layout({ user }: { user: User | null }) {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const onLogoutButton = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <MenuAppBar onLogout={onLogoutButton} user={user} />
      <div>
        <Outlet />
      </div>
      <Footer />
    </Box>
  );
}
