import React from 'react';
import { AuthListener } from '@/components/auth/AuthListener';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthListener />
            {children}
        </>
    );
}
