import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
    const location = useLocation();
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white">
            <div className="container mx-auto flex h-14 items-center gap-10 px-4">
                <div className="flex items-center gap-2">
                    <img src="/logo.svg" alt="Schedulcious Logo" className="h-8 w-auto" />
                </div>
                <nav className="flex items-center gap-6">
                    <Link
                        to="/"
                        className={cn(
                            'text-sm font-medium transition-colors hover:text-primary',
                            location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
                        )}
                    >
                        Home
                    </Link>
                    <Link
                        to="/dishes"
                        className={cn(
                            'text-sm font-medium transition-colors hover:text-primary',
                            location.pathname === '/dishes'
                                ? 'text-primary'
                                : 'text-muted-foreground'
                        )}
                    >
                        Dishes
                    </Link>
                    <Link
                        to="/allergies"
                        className={cn(
                            'text-sm font-medium transition-colors hover:text-primary',
                            location.pathname === '/allergies'
                                ? 'text-primary'
                                : 'text-muted-foreground'
                        )}
                    >
                        Allergies
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;
