import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h2" textAlign="center" mt={5}>
        Online Laundry Booking System
      </Typography>
      <Typography variant="body1" textAlign="center" mt={7}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Grid
        container
        alignItems="center"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        mt={12}
      >
        <Grid item>
          <Typography variant="h4">Make your booking now !</Typography>
        </Grid>
        <Grid item>
          <Link to="/bookings">
            <Button size="large" variant="contained">
              Start
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
