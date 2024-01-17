/**
 * Calculates the ISO week number for a given date.
 * 
 * @param date - The date for which to calculate the ISO week number.
 * @returns The ISO week number.
 */
export const getISOWeekNumber = (date: Date): number => Math.ceil(((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / (24 * 60 * 60 * 1000) + 1) / 7);