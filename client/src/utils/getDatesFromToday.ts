export const getDatesFromToday = (daysNum: number) => {
  const dates = [];

  let currentDate = new Date();
  for (let i = 0; i < daysNum; i++) {
    dates.push(currentDate);
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1 // Will increase month if over range
    );
  }
  return dates;
};
