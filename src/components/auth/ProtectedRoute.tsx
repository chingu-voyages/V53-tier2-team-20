import { useAuthStore } from '@/store/authStore';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    redirectTo?: string;
}

export function ProtectedRoute({ children, redirectTo = '/auth' }: ProtectedRouteProps) {
    const user = useAuthStore((state) => state.user);
    const location = useLocation();

    // Handle unauthenticated state
    if (!user) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Render protected content if authenticated
    return <>{children}</>;
}
