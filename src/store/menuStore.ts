import { getUpcomingMonday } from '@/lib/utils';
import { DayOfWeek, Dish, GeneratedMenus, WeeklyMenu } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MenuState {
    selectedWeek: Date | undefined;
    setSelectedWeek: (date: Date | undefined) => void;

    menu: WeeklyMenu;
    setMenu: (menu: WeeklyMenu) => void;
    generatedMenus: GeneratedMenus;
    setGeneratedMenus: (menus: GeneratedMenus) => void;
    updateGeneratedMenu: (weekKey: string, menu: WeeklyMenu) => void;

    isMenuGenerated: boolean;
    setIsMenuGenerated: (isGenerated: boolean) => void;

    availableDishes: Dish[];
    setAvailableDishes: (dishes: Dish[]) => void;

    selectedDay: DayOfWeek | null;
    setSelectedDay: (day: DayOfWeek | null) => void;
}

export const useMenuStore = create<MenuState>()(
    persist(
        (set) => ({
            selectedWeek: getUpcomingMonday(),
            setSelectedWeek: (date) => set({ selectedWeek: date }),

            menu: {
                Monday: { isDayOff: false },
                Tuesday: { isDayOff: false },
                Wednesday: { isDayOff: false },
                Thursday: { isDayOff: false },
                Friday: { isDayOff: false },
                Saturday: { isDayOff: false },
                Sunday: { isDayOff: false },
            },
            setMenu: (menu) => set({ menu }),

            generatedMenus: {},
            setGeneratedMenus: (menus) => set({ generatedMenus: menus }),
            updateGeneratedMenu: (weekKey, menu) =>
                set((state) => ({
                    generatedMenus: {
                        ...state.generatedMenus,
                        [weekKey]: menu,
                    },
                })),

            isMenuGenerated: false,
            setIsMenuGenerated: (isGenerated) => set({ isMenuGenerated: isGenerated }),

            availableDishes: [],
            setAvailableDishes: (dishes) => set({ availableDishes: dishes }),

            selectedDay: null,
            setSelectedDay: (day) => set({ selectedDay: day }),
        }),
        {
            name: 'menu-storage',
            partialize: (state) => ({
                // Only persist these fields
                generatedMenus: state.generatedMenus,
                // availableDishes: state.availableDishes,
            }),
        }
    )
);
