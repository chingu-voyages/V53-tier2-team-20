import React from 'react';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Hello world!</h1>
                    <p className="text-blue-500 hover:text-blue-700 cursor-pointer">
                        This text should be blue and change on hover
                    </p>
                    <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                        Test Button
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;
