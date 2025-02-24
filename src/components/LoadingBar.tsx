import { cn } from '@/lib/utils';

interface LoadingBarProps {
    show: boolean;
    className?: string;
}

export function LoadingBar({ show, className }: LoadingBarProps) {
    if (!show) return null;

    return (
        <div className={cn('fixed top-0 left-0 right-0 h-1 bg-primary/10', className)}>
            <div className="h-full w-1/3 bg-primary animate-loading-bar" />
        </div>
    );
}
