import { startOfISOWeek, addWeeks, format, getISOWeeksInYear } from 'date-fns';

export function getWeeksOfYear(year) {
  const weeks = getISOWeeksInYear(new Date(year, 0, 4));
  return Array.from({ length: weeks }, (_, i) => {
    const week = i + 1;
    const jan4 = new Date(year, 0, 4);
    const firstISOWeekMonday = startOfISOWeek(jan4);
    const thisWeekMonday = addWeeks(firstISOWeekMonday, i);
    return {
      week,
      start: format(thisWeekMonday, "dd-MM-yyyy"),
      end: format(addWeeks(thisWeekMonday, 1) - 1, "dd-MM-yyyy"),
    };
  });
}