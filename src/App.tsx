import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './providers/AuthProvider';
import { useAuthStore } from './store/authStore';
import { SplashScreen } from './components/SplashScreen';

const App: React.FC = () => {
    const [isSplashComplete, setIsSplashComplete] = useState(true);
    const loading = useAuthStore((state) => state.loading);

    // Only show main content when both conditions are met
    const shouldShowContent = !isSplashComplete && !loading;

    return (
        <BrowserRouter>
            <AuthProvider>
                {!shouldShowContent ? (
                    <SplashScreen onComplete={() => setIsSplashComplete(false)} />
                ) : (
                    <AppRoutes />
                )}
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
