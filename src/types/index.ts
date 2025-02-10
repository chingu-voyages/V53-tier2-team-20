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
    day: string;
    dish?: Dish;
    isDayOff?: boolean;
};

export type WeeklyMenu = DayAssignment[];

export type MenuGenerationResult = {
    menu: WeeklyMenu;
    remainingDishes: Dish[];
};
