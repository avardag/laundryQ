import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { UsersBooking } from "../types/bokingsTypes";

interface BookingCardProps {
  booking: UsersBooking;
  onDelete: (id: number) => void;
}

export default function BookingCard({ booking, onDelete }: BookingCardProps) {
  const [pinShow, setPinShow] = useState(false);
  const handlePinShowClick = () => {
    setPinShow(!pinShow);
  };
  return (
    <Card sx={{ minWidth: 250, my: 1 }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography color="primary" gutterBottom>
            {new Date(booking.dateTimeFrom).toLocaleDateString()}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ mr: 2 }}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Start time
              </Typography>
              <Typography>
                {new Date(booking.dateTimeFrom).toLocaleTimeString()}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                End time
              </Typography>
              <Typography>
                {new Date(booking.dateTimeTill).toLocaleTimeString()}
              </Typography>
            </Box>
          </Box>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            {pinShow ? (
              <>
                <Chip label={booking.pin} sx={{ minWidth: "5rem" }} />
                <Button size="small" color="info" onClick={handlePinShowClick}>
                  Hide PIN
                </Button>
              </>
            ) : (
              <>
                <Chip label="* * * * *" sx={{ minWidth: "5rem" }} />
                <Button size="small" color="info" onClick={handlePinShowClick}>
                  Show PIN
                </Button>
              </>
            )}
          </Stack>
        </Box>
        <Box>
          <Typography color="primary" gutterBottom>
            Details
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {booking.name} on {booking.address}
          </Typography>
          <Typography>
            <Typography
              component="span"
              sx={{ fontSize: 14 }}
              color="text.secondary"
            >
              Machine Number:{" "}
            </Typography>
            {booking.number}
          </Typography>
          <Typography>
            <Typography
              component="span"
              sx={{ fontSize: 14 }}
              color="text.secondary"
            >
              Machine Size:{" "}
            </Typography>
            {booking.size} kg
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          size="small"
          color="secondary"
          onClick={() => onDelete(booking.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
