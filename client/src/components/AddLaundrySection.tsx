import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import LaundryImage2 from "../assets/img/laundry_blue_2.png";
export default function AddLaundrySection() {
  return (
    <Box
      sx={{
        py: 10,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Box>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          sx={{ fontSize: { xs: "2.4rem", md: "2.75rem" } }}
        >
          Add your laundry
        </Typography>
        <Typography fontSize={18} textAlign="center" mt={7}>
          You can add your laundry to our system. After we approve your laundry
          your clients or residents can make their bookings.
        </Typography>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} my={4}>
          <Grid item xs={12} md={6} alignItems="center">
            <Typography
              variant="h4"
              textAlign="center"
              sx={{ fontSize: { xs: "1.50rem", md: "1.75rem" } }}
            >
              Add your laundry now!
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} textAlign="center">
            <Link to="/laundry">
              <Button
                size="large"
                variant="contained"
                color="secondary"
                sx={{ color: "white", mt: { xs: 2, md: 0 } }}
              >
                Register
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Typography fontSize={18} textAlign="center" mt={4}>
          You need to be logged in to add a laundry
        </Typography>
      </Box>
      <Box
        component="img"
        sx={{
          width: { xs: 400, lg: 600 },
        }}
        alt="The house from the offer."
        src={LaundryImage2}
      />
    </Box>
  );
}
