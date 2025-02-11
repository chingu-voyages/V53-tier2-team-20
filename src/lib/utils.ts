import { AllergyItem, DayAssignment, Dish, MenuGenerationResult, WeeklyMenu } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getUpcomingMonday = (): Date => {
    const today = new Date();

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
    const day = selectedDate.getDay(); // 0-6
    // console.log('User clicked date:', selectedDate.toLocaleDateString());
    // Calculate how many days to go backwards
    // If Sunday (0), go back 6 days
    // If Monday (1), go back 0 days
    // If Tuesday (2), go back 1 day, etc.
    const daysToSubtract = day === 0 ? 6 : day - 1;

    const monday = new Date(selectedDate);
    monday.setDate(selectedDate.getDate() - daysToSubtract);
    return monday;
};

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const getRandomDish = (availableDishes: Dish[]): Dish => {
    const randomIndex = Math.floor(Math.random() * availableDishes.length);
    return availableDishes[randomIndex];
};

export const assignDishToDay = (day: string, dish: Dish): DayAssignment => {
    return { day, dish };
};

export const getSafeDishes = (dishes: Dish[], allergies: AllergyItem[]): Dish[] => {
    return dishes.filter((dish) => {
        return !dish.ingredients.some((ingredient) =>
            allergies.some((allergy) =>
                ingredient.toLowerCase().includes(allergy.name.toLowerCase())
            )
        );
    });
};

export const generateWeeklyMenu = (
    dishes: Dish[],
    allergies: AllergyItem[]
): MenuGenerationResult => {
    const safeDishes = getSafeDishes(dishes, allergies);

    if (safeDishes.length < 7) {
        throw new Error('Not enough safe dishes available after filtering allergens');
    }

    const availableDishes = [...safeDishes];
    const menu: WeeklyMenu = DAYS_OF_WEEK.map((day) => {
        const dish = getRandomDish(availableDishes);
        // Remove the selected dish here
        availableDishes.splice(availableDishes.indexOf(dish), 1);
        return assignDishToDay(day, dish);
    });

    return {
        menu,
        remainingDishes: availableDishes,
    };
};
