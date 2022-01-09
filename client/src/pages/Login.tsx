import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../app/store";
//actions
import { login } from "../app/features/authSlice";
export default function Login() {
  let navigate = useNavigate();
  let location = useLocation() as any; //TODO: fix types
  let auth = useAuth();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;

    dispatch(login({ email, password })).then((data) => {
      if (data.payload?.status === "success") navigate(from, { replace: true });
    });
  }
  if (authState.loading) {
    return <h1>Loading.....</h1>;
  }
  return (
    <div>
      <h1>Login here</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="email" type="text" placeholder="Email" />
        </label>
        <label>
          Password:{" "}
          <input name="password" type="password" placeholder="Password" />
        </label>{" "}
        <button type="submit">Login</button>
        {authState.error && (
          <div style={{ color: "red" }}>
            <p>{authState.errorMessage}</p>
          </div>
        )}
        <div>
          Dont have an account? Sign up here{" "}
          <Link to="/signup">Signup Page</Link>
        </div>
      </form>
    </div>
  );
}
