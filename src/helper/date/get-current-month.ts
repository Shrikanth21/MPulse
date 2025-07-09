export function getCurrentMonthName(): string {
    const now = new Date();
    return now.toLocaleString('default', { month: 'long' });
}
