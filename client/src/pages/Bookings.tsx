import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useAuth } from "../hooks/useAuth";
import { getDatesFromToday } from "../utils/getDatesFromToday";
import { createBooking, getBookings } from "../app/features/bookingsSlice";
import { getMachines } from "../app/features/laundrySlice";
import { useAppSelector, useAppDispatch } from "../app/store";
import { BookingRequest } from "../types/bokingsTypes";
import { TimeSlot, timeSlots } from "../utils/timeSlots";
import BookingDialog from "../components/BookingDialog";
import BookingButton, { BookingDetails } from "../components/BookingButton";

export default function Bookings() {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (auth.user) {
      auth.user?.laundryId && dispatch(getMachines(auth.user?.laundryId));
      auth.user?.laundryId && dispatch(getBookings(auth.user.laundryId));
    }
  }, []);

  const machines = useAppSelector((state) => state.laundry.machines);
  const bookings = useAppSelector((state) => state.bookings.bookings);
  //
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //
  if (!auth.user?.laundryId) {
    return (
      <Container maxWidth="md">
        <Grid
          container
          alignItems="center"
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          mt={12}
        >
          <Grid item>
            <Typography variant="h5">
              Set your laundry before you make a booking
            </Typography>
          </Grid>
          <Grid item>
            <Link to="/profile/my-laundry">
              <Button size="large">Update</Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    );
  }
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );

  const handleBookingBtnClick = ({
    dateTimeFrom,
    dateTimeTill,
    machine,
    timeSlot,
  }: BookingDetails) => {
    setBookingDetails({ dateTimeFrom, dateTimeTill, machine, timeSlot });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleDialogSubmit = () => {
    setLoading(true);

    if (auth.user?.id && bookingDetails) {
      const dataToSubmit: BookingRequest = {
        userId: auth.user?.id,
        userFirstName: auth.user?.firstName,
        userLastName: auth.user?.lastName,
        dateTimeFrom: bookingDetails.dateTimeFrom,
        dateTimeTill: bookingDetails.dateTimeTill,
        machineId: bookingDetails.machine.id,
      };
      dispatch(createBooking(dataToSubmit));
      enqueueSnackbar(`Booking added`, {
        variant: "success",
      });
      setLoading(false);
    }
    setDialogOpen(false);
  };
  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h2" textAlign="center" mt={5}>
        Make a booking
      </Typography>
      <div></div>
      <div>
        {getDatesFromToday(18).map((date) => (
          <Accordion
            key={date.toDateString()}
            TransitionProps={{ unmountOnExit: true }}
            expanded={expanded === date.toDateString()}
            onChange={handleChange(date.toDateString())}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0, color: "teal" }}>
                {date.toLocaleDateString()}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Select a timeslot for booking
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {machines.length > 0 &&
                machines.map((machine, idx, machArray) => (
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    key={machine.id}
                  >
                    <Grid item xs={3} md={3}>
                      <Typography>Machine {machine.number}</Typography>
                      <Typography>{machine.size} kg</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      md={9}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "repeat(2, 1fr)",
                          sm: "repeat(3, 1fr)",
                          md: "repeat(6, 1fr)",
                        },
                      }}
                    >
                      {timeSlots.map((slot) => (
                        <BookingButton
                          timeSlot={slot}
                          date={date}
                          machine={machine}
                          onButtonClick={handleBookingBtnClick}
                          key={slot.timeFrom}
                          bookings={bookings}
                        />
                      ))}
                    </Grid>
                    {idx !== machArray.length - 1 ? (
                      <Divider
                        variant="middle"
                        sx={{ width: "98%", my: "5px" }}
                      />
                    ) : null}
                  </Grid>
                ))}
            </AccordionDetails>
          </Accordion>
        ))}
        <BookingDialog
          id="booking dialog"
          keepMounted={false}
          open={dialogOpen}
          loading={loading}
          onClose={handleDialogClose}
          bookingDetails={bookingDetails}
          onSubmit={handleDialogSubmit}
        />
      </div>
    </Container>
  );
}
