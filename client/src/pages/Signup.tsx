import { Link as RouterLink, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../app/store";
//actions
import { login, signup } from "../app/features/authSlice";
import { SignupRequest } from "../types/types";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mndkjnjkncjkdncui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    };

    dispatch(signup(dataToSignup)).then((data) => {
      if (data.payload?.status === "success") navigate("/", { replace: true });
    });
  }
  if (authState.loading) {
    return <h1>Loading.....</h1>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {authState.error && (
          <div style={{ color: "red" }}>
            <p>{authState.errorMessage}</p>
          </div>
        )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordConfirm"
                label=" Confirm Password"
                type="password"
                id="passwordConfirm"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Your Address"
                name="address"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="city"
                name="city"
                required
                fullWidth
                id="city"
                label="City"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="postcode"
                label="Postcode"
                name="postcode"
                autoComplete="postal-code"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Your phone"
                name="phone"
                autoComplete="tel"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouterLink to="/login">
                Already have an account? Sign in
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
