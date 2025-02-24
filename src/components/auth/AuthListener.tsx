import { useEffect } from 'react';
import { supabase } from '@/lib/supabase/config';
import { useAuthStore } from '@/store/authStore';

export function AuthListener() {
    const store = useAuthStore();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            store.setUser(session?.user ?? null);
            store.setLoading(false);
        });

        // listen for auth change
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            // console.log('Auth event:', _event);
            store.setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [store]);

    return null;
}
