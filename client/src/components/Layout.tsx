import { useAppDispatch } from "../app/store";
import { useNavigate, Outlet } from "react-router-dom";
import { User } from "../app/features/types";
import { logout } from "../app/features/authSlice";
import MenuAppBar from "./AppBar";

export default function Layout({ user }: { user: User | null }) {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const onLogoutButton = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <MenuAppBar onLogout={onLogoutButton} user={user} />
      <div>
        <Outlet />
      </div>
    </>
  );
}
