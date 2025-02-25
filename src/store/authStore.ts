import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
// import { supabase } from '../lib/supabase/config';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: Error | null;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    // signInWithEmail: (email: string, password: string) => Promise<void>;
    // signInWithGoogle: () => Promise<void>;
    // signUp: (email: string, password: string) => Promise<void>;
    // signOut: () => Promise<void>;
    // // Optional: reset error state
    // clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,
    error: null,
    // Auth methods
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
}));
