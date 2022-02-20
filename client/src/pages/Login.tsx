import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../app/store";
//actions
import { login } from "../app/features/authSlice";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mukkdcldklackecmi.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
          Sign in
        </Typography>
        {authState.error && (
          <div style={{ color: "red" }}>
            <p>{authState.errorMessage}</p>
          </div>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <RouterLink to="/signup">Forgot password?</RouterLink>
            </Grid>
            <Grid item>
              <RouterLink to="/signup">
                Don't have an account? Sign Up
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
