import Button from "@mui/material/Button";

import { TimeSlot } from "../utils/timeSlots";
import { Machine } from "../types/laundryTypes";
import { Booking } from "../types/bokingsTypes";

export type BookingDetails = {
  dateTimeFrom: number;
  dateTimeTill: number;
  machine: Machine;
  timeSlot: TimeSlot;
};

interface BookingBtnProps {
  timeSlot: TimeSlot;
  date: Date;
  machine: Machine;
  bookings: Booking[];
  onButtonClick: ({
    dateTimeFrom,
    dateTimeTill,
    machine,
    timeSlot,
  }: BookingDetails) => void;
}
export default function BookingButton({
  timeSlot,
  onButtonClick,
  date,
  machine,
  bookings,
}: BookingBtnProps) {
  // const dateTimeFrom = date.toDateString() + " " + timeSlot.timeFrom + ":00";

  // const dateTimeTill = date.toDateString() + " " + timeSlot.timeTill + ":00";
  const dateTimeFrom = new Date(
    date.toDateString() + " " + timeSlot.timeFrom + ":00"
  ).getTime();

  const dateTimeTill = new Date(
    date.toDateString() + " " + timeSlot.timeTill + ":00"
  ).getTime();

  const match = bookings.find(
    (b) =>
      new Date(b.dateTimeFrom).getTime() === dateTimeFrom &&
      b.machineId === machine.id
  );

  return (
    <Button
      disabled={match ? true : false}
      onClick={() =>
        onButtonClick({ dateTimeFrom, dateTimeTill, machine, timeSlot })
      }
    >
      {match ? (
        <span>{match.userFirstName ? match.userFirstName : "Booked"}</span>
      ) : (
        <span>
          {timeSlot.timeFrom}-{timeSlot.timeTill}
        </span>
      )}
    </Button>
  );
}
