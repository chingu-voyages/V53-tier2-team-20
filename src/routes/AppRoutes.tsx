import { Route, Routes } from 'react-router-dom';
import Layout from '@/layout/Layout';
import NotFound from '@/pages/NotFound';
import { lazy } from 'react';
import AuthPage from '@/pages/Auth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const MenuScheduler = lazy(() => import('@/pages/MenuScheduler'));
const Dishes = lazy(() => import('@/pages/Dishes'));
const Allergies = lazy(() => import('@/pages/Allergies'));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth" element={<AuthPage />} />
            {/* Protected Layout with shared navigation */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<MenuScheduler />} />
                <Route path="/dishes" element={<Dishes />} />
                <Route path="/allergies" element={<Allergies />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
