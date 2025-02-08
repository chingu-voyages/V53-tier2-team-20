// Allergy types
export interface AllergyItem {
    id: number;
    name: string;
    initial: string;
}

// Menu types
export interface MenuItem {
    id: string;
    name: string;
    createdAt: Date;
}

export interface Dish {
    id: number;
    name: string;
    ingredients: string[];
    calories: number;
}
