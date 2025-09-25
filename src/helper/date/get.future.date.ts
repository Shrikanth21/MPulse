/**
 * Gets a future day based on the current date.
 * @param days The number of days to add.
 * @returns The future day as a string.
 */
export function getFutureDay(days: number): string {
  const today = new Date();
  today.setDate(today.getDate() + days);
  const day = today.getDate().toString();
  return day;
}

/**
 * Gets a future date based on the current date.
 * @param days The number of days to add.
 * @returns The future date as a string.
 */
export function getFutureDateFormatted(days: number): string {
  const today = new Date();
  today.setDate(today.getDate() + days);
  return today.toLocaleDateString();
}

/**
 * Gets the current date formatted as a string.
 * @returns The current date as a string.
 */
export function getFormattedDate(): string {
  const today = new Date();
  const day = today.getDate().toString();
  const month = (today.getMonth() + 1).toString();
  const year = today.getFullYear();

  return `${month}/${day}/${year}`;
}

/**
 * Gets yesterday's date formatted as a string.
 */
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
export const formattedYesterday = `${yesterday.getMonth() + 1}/${yesterday.getDate()}/${yesterday.getFullYear()}`;