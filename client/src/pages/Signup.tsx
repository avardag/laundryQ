import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../app/store";
//actions
import { login, signup } from "../app/features/authSlice";

export default function Signup() {
  let navigate = useNavigate();
  let auth = useAuth();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;
    let passwordConfirm = formData.get("passwordConfirm") as string;
    let phone = formData.get("phone") as string;
    let firstName = formData.get("firstName") as string;
    let lastName = formData.get("lastName") as string;

    dispatch(
      signup({ email, password, firstName, passwordConfirm, lastName, phone })
    ).then((data) => {
      if (data.payload?.status === "success") navigate("/", { replace: true });
    });
  }
  if (authState.loading) {
    return <h1>Loading.....</h1>;
  }

  return (
    <div>
      <h1>Signup here</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:{" "}
          <input
            name="email"
            type="text"
            placeholder="Email"
            autoComplete="off"
          />
        </label>
        <label>
          Password:{" "}
          <input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
        </label>{" "}
        <label>
          Confirm Password:{" "}
          <input
            name="passwordConfirm"
            type="password"
            placeholder="Confirm Password"
          />
        </label>{" "}
        <label>
          First Name:{" "}
          <input name="firstName" type="text" placeholder="First Name" />
        </label>{" "}
        <label>
          Last Name:{" "}
          <input name="lastName" type="text" placeholder="Last Name" />
        </label>{" "}
        <label>
          Phone: <input name="phone" type="text" placeholder="Phone number" />
        </label>{" "}
        <button type="submit">Signup</button>
        {authState.error && (
          <div style={{ color: "red" }}>
            <p>{authState.errorMessage}</p>
          </div>
        )}
        <div>
          You have an account? Log in here <Link to="/login">Login Page</Link>
        </div>
      </form>
    </div>
  );
}
