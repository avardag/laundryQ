import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
//RR
import { Outlet } from "react-router-dom";
import ListItemLink from "../components/ListItemLink";

export default function Profile() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h2" textAlign="center" mt={5}>
        Your profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3} borderRight="1px solid black">
          <List aria-label="main mailbox folders">
            <ListItemLink
              to="/profile/my-bookings"
              primary="My bookings"
              icon={<BookOnlineIcon />}
            />
            <ListItemLink
              to="/profile/my-laundry"
              primary="My laundry"
              icon={<LocalLaundryServiceIcon />}
            />
            <ListItemLink
              to="/profile/my-info"
              primary="My Info"
              icon={<AccountBoxIcon />}
            />
          </List>
        </Grid>
        <Grid item xs={9}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
}
