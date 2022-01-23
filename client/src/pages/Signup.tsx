import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../app/store";
//actions
import { login, signup } from "../app/features/authSlice";
import { useState } from "react";
import { SignupRequest } from "../app/features/types";

export default function Signup() {
  let navigate = useNavigate();
  let auth = useAuth();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const [laundryId, setLaundryId] = useState<null | string>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;
    let passwordConfirm = formData.get("passwordConfirm") as string;
    let phone = formData.get("phone") as string;
    let firstName = formData.get("firstName") as string;
    let lastName = formData.get("lastName") as string;
    let city = formData.get("city") as string;
    let address = formData.get("address") as string;
    let postcode = formData.get("postcode") as string;

    const dataToSignup: SignupRequest = {
      email,
      password,
      firstName,
      passwordConfirm,
      lastName,
      phone,
      city,
      address,
      postcode,
      laundryId: null,
    };
    if (laundryId) dataToSignup.laundryId = parseInt(laundryId);

    dispatch(signup(dataToSignup)).then((data) => {
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
        <div>
          <label>
            Email:{" "}
            <input
              name="email"
              type="text"
              placeholder="Email"
              autoComplete="off"
            />
          </label>
        </div>
        <div>
          <label>
            Password:{" "}
            <input
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="off"
            />
          </label>
        </div>
        <div>
          <label>
            Confirm Password:{" "}
            <input
              name="passwordConfirm"
              type="password"
              placeholder="Confirm Password"
            />
          </label>
        </div>
        <div>
          <label>
            First Name:{" "}
            <input name="firstName" type="text" placeholder="First Name" />
          </label>
        </div>
        <div>
          <label>
            Last Name:{" "}
            <input name="lastName" type="text" placeholder="Last Name" />
          </label>
        </div>
        <div>
          <label>
            Phone: <input name="phone" type="text" placeholder="Phone number" />
          </label>
        </div>
        <div>
          <label>
            City: <input name="city" type="text" placeholder="Your city" />
          </label>
        </div>
        <div>
          <label>
            Address:{" "}
            <input name="address" type="text" placeholder="Your address" />
          </label>
        </div>
        <div>
          <label>
            Post code:{" "}
            <input name="postcode" type="text" placeholder="Your postal code" />
          </label>
        </div>
        <div>
          <label>
            laundryId
            <select
              name="laundryId"
              onChange={(e) => setLaundryId(e.currentTarget.value)}
            >
              <option value="">Select</option>
              <option value="1">Fisrt Laundry</option>
              <option value="2">Second Laundry</option>
            </select>
          </label>
        </div>

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
