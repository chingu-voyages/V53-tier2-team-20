import { create } from 'zustand';

interface ErrorState {
    errorMessage: string;
    setErrorMessage: (message: string) => void;
    clearError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
    errorMessage: '',
    setErrorMessage: (message) => set({ errorMessage: message }),
    clearError: () => set({ errorMessage: '' }),
}));
