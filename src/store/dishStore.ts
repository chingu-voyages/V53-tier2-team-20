import { Dish } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DishState {
    dishes: Dish[];
    isLoading: boolean;
    error: string | null;
    fetchDishes: () => Promise<void>;
}

export const useDishesStore = create<DishState>()(
    persist(
        (set) => ({
            dishes: [],
            isLoading: false,
            error: null,
            fetchDishes: async () => {
                try {
                    set({ isLoading: true });
                    const response = await fetch('https://menus-api.vercel.app/dishes');
                    if (!response.ok) {
                        throw new Error('Failed to fetch dishes');
                    }
                    const data = (await response.json()) as Dish[]; // Await the JSON response and assert the type
                    // Add IDs to dishes
                    const dishesWithIds = data.map((dish, index) => ({
                        ...dish,
                        id: index + 1,
                    }));
                    set({ dishes: dishesWithIds, error: null });
                } catch (err) {
                    set({ error: err instanceof Error ? err.message : 'An error occured' });
                } finally {
                    set({ isLoading: false });
                }
            },
        }),
        {
            name: 'dish-storage',
        }
    )
);
