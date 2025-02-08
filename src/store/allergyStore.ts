import { AllergyItem } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AllergyState {
    allergies: AllergyItem[];
    addAllergy: (allergy: Omit<AllergyItem, 'id'>) => void;
    deleteAllergy: (id: number) => void;
    updateAllergy: (id: number, name: string) => void;
}

export const useAllergyStore = create<AllergyState>()(
    persist(
        (set) => ({
            allergies: [],
            addAllergy: (allergy) =>
                set((state) => ({
                    allergies: [
                        ...state.allergies,
                        {
                            id: Date.now(),
                            ...allergy,
                        },
                    ],
                })),
            deleteAllergy: (id: number) =>
                set((state) => ({
                    allergies: state.allergies.filter((allergy) => allergy.id !== id),
                })),
            updateAllergy: (id: number, name: string) =>
                set((state) => ({
                    allergies: state.allergies.map((allergy) =>
                        allergy.id === id
                            ? {
                                  ...allergy,
                                  name,
                                  initial: name.charAt(0).toUpperCase(),
                              }
                            : allergy
                    ),
                })),
        }),
        {
            name: 'allergy-storage',
        }
    )
);
