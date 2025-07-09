export function getFutureDay(days: number): string {
  const today = new Date();
  today.setDate(today.getDate() + days);
  const day = today.getDate().toString();
  return day;
}


export function getFutureDateFormatted(days: number): string {
  const today = new Date();
  today.setDate(today.getDate() + days);
  const month = (today.getMonth() + 1).toString();
  const day = today.getDate().toString();
  const year = today.getFullYear().toString();
  return `${month}/${day}/${year}`;
}