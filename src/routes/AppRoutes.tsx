import { Route, Routes } from 'react-router-dom';
import Layout from '@/layout/Layout';
import NotFound from '@/pages/NotFound';
import { lazy } from 'react';

const MenuScheduler = lazy(() => import('@/pages/MenuScheduler'));
const Dishes = lazy(() => import('@/pages/Dishes'));
const Allergies = lazy(() => import('@/pages/Allergies'));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<MenuScheduler />} />
                <Route path="/dishes" element={<Dishes />} />
                <Route path="/allergies" element={<Allergies />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
