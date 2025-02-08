import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
    return (
        <div className="transition-all duration-300 ease-in-out">
            <Card className="shadow-md h-full border border-gray-200">
                <CardHeader className="pb-3">
                    <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="flex flex-col">
                    <div className="space-y-4">
                        {/* Ingredients section */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>
                        {/* Calories section */}
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-12" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
