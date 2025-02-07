import React from 'react';
import { Button } from '@/components/ui/button';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Hello world!</h1>
                    <p className="text-blue-500 hover:text-blue-700 cursor-pointer">
                        This text should be blue and change on hover
                    </p>
                    <Button variant="default" size="sm">
                        Default Button
                    </Button>
                    <span className="p-2">
                        <Button variant="secondary" size="lg" className="text-blue-600 text-lg">
                            Secondary Button
                        </Button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default App;
