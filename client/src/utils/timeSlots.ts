export interface TimeSlot {
  timeFrom: string;
  timeTill: string;
}
export const timeSlots: TimeSlot[] = [
  {
    timeFrom: "06:00",
    timeTill: "09:00",
  },
  {
    timeFrom: "09:00",
    timeTill: "12:00",
  },
  {
    timeFrom: "12:00",
    timeTill: "15:00",
  },
  {
    timeFrom: "15:00",
    timeTill: "18:00",
  },
  {
    timeFrom: "18:00",
    timeTill: "21:00",
  },
  {
    timeFrom: "21:00",
    timeTill: "24:00",
  },
];
