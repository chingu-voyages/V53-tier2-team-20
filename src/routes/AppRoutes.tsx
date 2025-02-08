import { Route, Routes } from 'react-router-dom';
import Layout from '@/layout/Layout';
import MenuScheduler from '@/pages/MenuScheduler';
import Allergies from '@/pages/Allergies';
import NotFound from '@/pages/NotFound';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<MenuScheduler />} />
                <Route path="/allergies" element={<Allergies />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
