import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function NotFound() {
    // Add this to debug
    console.log('NotFound component rendered at:', performance.now());

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="text-center space-y-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
                        404
                    </h1>
                    <h2 className="text-3xl font-semibold tracking-tight text-primary">
                        Page Not Found
                    </h2>
                </div>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                    Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been
                    moved or deleted.
                </p>
                <Link to="/">
                    <Button size="lg" className="mt-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
