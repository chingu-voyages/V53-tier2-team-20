import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function NotFound() {
    // Add this to debug
    console.log('NotFound component rendered at:', performance.now());

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="mx-auto w-full max-w-md text-center space-y-6 px-4">
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900 dark:text-gray-50">
                        404
                    </h1>
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
                        Page Not Found
                    </h2>
                </div>
                <p className="text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg sm:leading-8">
                    Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been
                    moved or deleted.
                </p>
                <Link to="/">
                    <Button
                        size="lg"
                        className="mt-4 bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
