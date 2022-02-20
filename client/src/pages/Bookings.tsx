import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useAuth } from "../hooks/useAuth";
import { getDatesFromToday } from "../utils/getDatesFromToday";
import {
  createBooking,
  getBookings,
  getMachines,
} from "../app/features/laundrySlice";
import { useAppSelector, useAppDispatch } from "../app/store";
import { BookingRequest, Machine } from "../app/features/laundryTypes";
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
  const bookings = useAppSelector((state) => state.laundry.bookings);
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
        dateTimeFrom: bookingDetails.dateTimeFrom,
        dateTimeTill: bookingDetails.dateTimeTill,
        machineId: bookingDetails.machine.id,
      };
      dispatch(createBooking(dataToSubmit));
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
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {date.toDateString()}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Select a timeslot for booking
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {machines.length > 0 &&
                machines.map((machine) => (
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    key={machine.id}
                  >
                    <Grid item xs={2} md={3}>
                      Machine {machine.number}
                    </Grid>
                    <Grid item xs={10} md={9}>
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
