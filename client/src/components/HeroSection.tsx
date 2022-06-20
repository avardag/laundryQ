import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LaundryImage from "../assets/img/laundry_blue.png";

export default function HeroSection() {
  return (
    <Paper sx={{ backgroundColor: "#F0F7F4", p: 4, my: { xs: 2, md: 6 } }}>
      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          component="img"
          sx={{
            width: { xs: 400, lg: 600 },
          }}
          alt="The house from the offer."
          src={LaundryImage}
        />
        <Box>
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
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
              m: { xs: "30px auto 0", md: "60px auto" },
              maxWidth: 800,
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              sx={{ fontSize: { xs: "1.75rem", md: "2.125rem" } }}
            >
              Make your booking now!
            </Typography>
            <div>
              <Link to="/bookings">
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  sx={{ color: "white", mt: { xs: 2, md: 0 } }}
                >
                  Start
                </Button>
              </Link>
            </div>
          </Box>{" "}
        </Box>
      </Box>
    </Paper>
  );
}
