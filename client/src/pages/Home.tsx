import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";

export default function Home() {
  return (
    <Box>
      <Box>
        <Container maxWidth="md" sx={{ height: "80vh" }}>
          <Paper sx={{ p: 4, my: 7 }}>
            <Typography
              variant="h3"
              component="h2"
              textAlign="center"
              sx={{ mt: 5, fontSize: { xs: "2.4rem", md: "3rem" } }}
            >
              Online Laundry Booking System
            </Typography>
            <Typography fontSize={18} textAlign="center" mt={7}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              blanditiis tenetur unde suscipit, quam beatae rerum inventore
              consectetur, neque doloribus, cupiditate numquam dignissimos
              laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} my={8}>
              <Grid item xs={12} md={6} alignItems="center">
                <Typography
                  variant="h4"
                  textAlign="center"
                  sx={{ fontSize: { xs: "1.75rem", md: "2.125rem" } }}
                >
                  Make your booking now!
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} textAlign="center">
                <Link to="/bookings">
                  <Button
                    size="large"
                    variant="contained"
                    sx={{ mt: { xs: 2, md: 0 } }}
                  >
                    Start
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
      <Box sx={{ bgcolor: grey[200] }}>
        <Container maxWidth="md" sx={{ py: 10 }}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            sx={{ fontSize: { xs: "2.4rem", md: "3rem" } }}
          >
            Add your laundry
          </Typography>
          <Typography fontSize={18} textAlign="center" mt={7}>
            You can add your laundry to our system. After we approve your
            laundry your clients or residents can make their bookings.
          </Typography>
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} my={8}>
            <Grid item xs={12} md={6} alignItems="center">
              <Typography
                variant="h4"
                textAlign="center"
                sx={{ fontSize: { xs: "1.75rem", md: "2.125rem" } }}
              >
                Add your laundry now!
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} textAlign="center">
              <Link to="/laundry">
                <Button
                  size="large"
                  variant="contained"
                  sx={{ mt: { xs: 2, md: 0 } }}
                >
                  Register
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Typography fontSize={18} textAlign="center" mt={7}>
            You need to be logged in to add a laundry
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
