import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BookingDetails } from "./BookingButton";

export interface BookingDialogProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  loading: boolean;
  onClose: (value?: string) => void;
  onSubmit: () => void;
  bookingDetails: BookingDetails | null;
}

export default function BookingDialog(props: BookingDialogProps) {
  const { onClose, open, loading, bookingDetails, onSubmit, ...other } = props;

  const handleEntering = () => {};

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onSubmit();
  };
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      {...other}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Booking Details</DialogTitle>
      <DialogContent dividers>
        <DialogContentText component="div" id="alert-dialog-description">
          <Typography variant="subtitle1" gutterBottom>
            Date of booking-{" "}
            <Typography component="span" color="primary">
              {bookingDetails?.dateTimeFrom &&
                new Date(bookingDetails?.dateTimeFrom).toLocaleDateString()}
            </Typography>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Time of booking -{" "}
            <Typography component="span" color="primary">
              {bookingDetails?.timeSlot.timeFrom}-
              {bookingDetails?.timeSlot.timeTill}
            </Typography>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            On machine number-{" "}
            <Typography component="span" color="primary">
              {bookingDetails?.machine.number}
            </Typography>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk} autoFocus disabled={loading}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
