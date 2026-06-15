function getMonthDates(numberOfMonths: number) {
  const today = new Date();

  const firstDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() - numberOfMonths,
    1,
  )
    .toISOString()
    .split("T")[0];

  const lastDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() - numberOfMonths + 1,
    0,
  )
    .toISOString()
    .split("T")[0];

  return { firstDayOfMonth, lastDayOfMonth };
}

export { getMonthDates };
