import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getUpcomingMonday = (): Date => {
    // get today's date
    const today = new Date();
    // get today's day number (0-6)
    const day = today.getDay();
    //
    const daysToAdd = day === 0 ? 1 : 8 - day;

    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysToAdd);
    return nextMonday;
};

export const getNextSunday = (monday: Date): Date => {
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return sunday;
};

export const getMonday = (triggerDate: Date): Date => {
    // Use the actual clicked date from triggerDate
    const selectedDate = new Date(triggerDate);
    const today = new Date();
    const day = selectedDate.getDay(); // 0-6
    console.log('User clicked date:', selectedDate.toLocaleDateString());
    // Calculate how many days to go backwards
    // If Sunday (0), go back 6 days
    // If Monday (1), go back 0 days
    // If Tuesday (2), go back 1 day, etc.
    const daysToSubtract = day === 0 ? 6 : day - 1;

    const monday = new Date(selectedDate);
    monday.setDate(selectedDate.getDate() - daysToSubtract);
    return monday;
};
