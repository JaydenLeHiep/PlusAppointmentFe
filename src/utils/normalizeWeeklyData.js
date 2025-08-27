const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function normalizeWeeklyData(dailyDetails) {
  const byDay = {};
  (Array.isArray(dailyDetails) ? dailyDetails : dailyDetails?.$values || []).forEach(entry => {
    byDay[entry.day] = entry;
  });

  return WEEK_DAYS.map(day => ({
    day,
    earnings: byDay[day]?.totalEarnings || 0,
    sessionCount: byDay[day]?.sessionCount || 0,
    date: byDay[day]?.date || null,
  }));
}