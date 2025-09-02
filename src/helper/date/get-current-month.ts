/**
 * Gets the current month name.
 * @returns The current month name as a string.
 */
export function getCurrentMonthName(): string {
    const now = new Date();
    return now.toLocaleString('default', { month: 'long' });
}
