import { DAYS_OF_WEEK } from '@/lib/constant';

// Allergy types
export interface AllergyItem {
    id: number;
    name: string;
    initial: string;
}

// Menu types
export interface Dish {
    id: number;
    name: string;
    ingredients: string[];
    calories: number;
    image?: string;
}

export type DayAssignment = {
    dish?: Dish;
    isDayOff: boolean;
};

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];

export type WeeklyMenu = Record<DayOfWeek, DayAssignment>;

export type MenuGenerationResult = {
    menu: WeeklyMenu;
    remainingDishes: Dish[];
};

export type GeneratedMenus = Record<string, WeeklyMenu>;
