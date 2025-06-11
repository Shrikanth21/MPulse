export function getFutureDay(days: number): string {
  const today = new Date();
  today.setDate(today.getDate() + days);
  const day = today.getDate().toString();
  return day;
}
