import { AllergyItem, DayAssignment, Dish, MenuGenerationResult, WeeklyMenu } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DAYS_OF_WEEK } from './constant';

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

    const daysToSubtract = day === 0 ? 6 : day - 1;

    const monday = new Date(selectedDate);
    monday.setDate(selectedDate.getDate() - daysToSubtract);
    return monday;
};

export const getRandomDish = (availableDishes: Dish[]): Dish => {
    const randomIndex = Math.floor(Math.random() * availableDishes.length);
    return availableDishes[randomIndex];
};

export const assignDishToDay = (dish?: Dish): DayAssignment => {
    return {
        dish,
        isDayOff: !dish, // if no dish, it's a day off
    };
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
    const menu: WeeklyMenu = {} as WeeklyMenu;

    // Assign dishes to each day
    DAYS_OF_WEEK.forEach((day) => {
        const dish = getRandomDish(availableDishes);
        // Remove the selected dish here
        availableDishes.splice(availableDishes.indexOf(dish), 1);
        menu[day] = assignDishToDay(dish);
    });

    return {
        menu,
        remainingDishes: availableDishes,
    };
};

export const getRecommendedDishes = (availableDishes: Dish[], count = 5): Dish[] => {
    const dishes = [...availableDishes];
    const recommendedDishes: Dish[] = [];

    while (recommendedDishes.length < count && dishes.length > 0) {
        const dish = getRandomDish(dishes);
        recommendedDishes.push(dish);
        dishes.splice(dishes.indexOf(dish), 1);
    }

    return recommendedDishes;
};
