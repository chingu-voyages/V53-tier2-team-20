// Allergy types
export interface AllergyItem {
    id: number;
    name: string;
    initial: string;
}

// Menu types
export interface MenuItem {
    id: number;
    name: string;
    ingredients: string[];
    calories: number;
    image?: string;
}

export type Dish = MenuItem;
