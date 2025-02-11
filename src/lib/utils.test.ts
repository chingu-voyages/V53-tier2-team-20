import { getRecommendedDishes } from './utils';

const mockDishes = [
    {
        id: 1,
        name: 'Dish 1',
        calories: 200,
        ingredients: ['ingredient1', 'ingredient2'],
    },
    {
        id: 2,
        name: 'Dish 2',
        calories: 300,
        ingredients: ['ingredient3', 'ingredient4'],
    },
    {
        id: 3,
        name: 'Dish 3',
        calories: 400,
        ingredients: ['ingredient5', 'ingredient6'],
    },
    {
        id: 4,
        name: 'Dish 4',
        calories: 500,
        ingredients: ['ingredient7', 'ingredient8'],
    },
    {
        id: 5,
        name: 'Dish 5',
        calories: 600,
        ingredients: ['ingredient9', 'ingredient10'],
    },
    {
        id: 6,
        name: 'Dish 6',
        calories: 700,
        ingredients: ['ingredient11', 'ingredient12'],
    },
    {
        id: 7,
        name: 'Dish 7',
        calories: 800,
        ingredients: ['ingredient13', 'ingredient14'],
    },
];

describe('getRecommendedDishes', () => {
    test('returns exactly 5 dishes when enough dishes available', () => {
        const result = getRecommendedDishes(mockDishes);
        expect(result.length).toBe(5);
    });

    test('returns unique dishes (no duplicates)', () => {
        const result = getRecommendedDishes(mockDishes);
        const uniqueIds = new Set(result.map((d) => d.id));
        expect(uniqueIds.size).toBe(5);
    });

    test('returns empty array when no dishes available', () => {
        const result = getRecommendedDishes([]);
        expect(result).toEqual([]);
    });

    test('maintains original array unchanged when not enough dishes', () => {
        // Create array with only 3 dishes
        const limitedDishes = mockDishes.slice(0, 3);
        const originalDishes = [...limitedDishes]; // Make a copy

        // Try to get recommendations (should return all 3)
        getRecommendedDishes(limitedDishes);

        // Verify original array wasn't modified
        expect(limitedDishes).toEqual(originalDishes);
        expect(limitedDishes.length).toBe(3); // Still has 3 dishes
    });

    test('handles null/undefined input gracefully', () => {
        // Test with invalid inputs
        // @ts-expect-error to test runtime behavior
        expect(() => getRecommendedDishes(null)).toThrow();
        // @ts-expect-error to test runtime behavior
        expect(() => getRecommendedDishes(undefined)).toThrow();
    });
});
