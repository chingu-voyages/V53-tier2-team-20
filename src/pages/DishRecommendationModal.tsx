import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getRecommendedDishes } from '@/lib/utils';
import { Dish } from '@/types';
import { useEffect, useState } from 'react';

interface DishRecommendationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (dish: Dish) => void;
    availableDishes: Dish[];
}

export default function DishRecommendationModal({
    isOpen,
    onClose,
    onSelect,
    availableDishes,
}: DishRecommendationModalProps) {
    const [recommendedDishes, setRecommendedDishes] = useState<Dish[]>([]);

    // console.log(`available dishes: ${availableDishes}`);
    useEffect(() => {
        if (isOpen) {
            setRecommendedDishes(getRecommendedDishes(availableDishes));
        }
    }, [isOpen, availableDishes]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Recommended Replacements</DialogTitle>
                    <DialogDescription>
                        Select a dish to replace the current menu item
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                        {recommendedDishes.map((dish) => (
                            <div
                                key={dish.id}
                                className="flex flex-col sm:flex-row p-4 rounded-lg bg-gray-50 items-center gap-4 hover:bg-gray-100 transition-colors"
                            >
                                <div className="relative w-full sm:w-24 h-24 rounded-md overflow-hidden">
                                    <img
                                        src="/menu-placeholder.jpg"
                                        alt={dish.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="font-semibold text-lg mb-1">{dish.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {dish.calories} calories
                                    </p>
                                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-2">
                                        {dish.ingredients.map((ingredient) => (
                                            <Badge
                                                key={ingredient}
                                                className="bg-[#FFF5ED] text-black hover:bg-[#FFF5ED]"
                                            >
                                                {ingredient}
                                            </Badge>
                                        ))}
                                    </div>
                                    <Button
                                        onClick={() => onSelect(dish)}
                                        className="w-full sm:w-auto"
                                    >
                                        Select
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
