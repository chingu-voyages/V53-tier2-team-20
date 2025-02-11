import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import {
    generateWeeklyMenu,
    getMonday,
    getNextSunday,
    getSafeDishes,
    getUpcomingMonday,
} from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Dish, WeeklyMenu } from '@/types';
import { useDishesStore } from '@/store/dishStore';
import { useAllergyStore } from '@/store/allergyStore';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X } from 'lucide-react';
import DishRecommendationModal from './DishRecommendationModal';

function MenuPage() {
    const [date, setDate] = useState<Date | undefined>(getUpcomingMonday());
    const [menu, setWeeklyMenu] = useState<WeeklyMenu>([]);
    const [availableDishes, setAvaialbleDishes] = useState<Dish[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    const { dishes, isLoading, error: dishError, fetchDishes } = useDishesStore();
    const { allergies } = useAllergyStore();

    const toggleDayOff = () => {};

    const openRecommendationModal = (day: string) => {
        setSelectedDay(day);
        setIsModalOpen(true);
    };

    const handleDishSelect = (dish: Dish) => {};

    console.log(`----------------------`);
    console.log('Debug Info:');
    console.log(`Total Dishes: ${dishes.length}`);
    const safeDishesCount = getSafeDishes(dishes.slice(0, 4), allergies).length;
    console.log(`Safe Dishes Count: ${safeDishesCount}`);
    console.log(
        'Allergies:',
        allergies.map((a) => a.name)
    );
    console.log(
        'Filtered Out Dishes:',
        dishes
            .filter((dish) =>
                dish.ingredients.some((ingredient) =>
                    allergies.some((allergy) =>
                        ingredient.toLowerCase().includes(allergy.name.toLowerCase())
                    )
                )
            )
            .map((d) => ({
                name: d.name,
                ingredients: d.ingredients,
            }))
    );

    console.log(`----------------------`);
    console.log(availableDishes);
    console.log(selectedDay);

    useEffect(() => {
        fetchDishes();
    }, [fetchDishes]);

    // Clear error when dishes or allergies change
    useEffect(() => {
        setErrorMessage('');
    }, [dishes, allergies]);

    useEffect(() => {
        if (dishError) {
            setErrorMessage(dishError);
        }
    }, [dishError]);

    const handleAutoGenerate = () => {
        try {
            // Clear any previous errors
            setErrorMessage('');

            const { menu, remainingDishes } = generateWeeklyMenu(dishes, allergies);
            setWeeklyMenu(menu);
            setAvaialbleDishes(remainingDishes);
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : 'Failed to generate menu');
        }
    };

    return (
        <div className="container p-6">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-[300px] space-y-4">
                    <Card>
                        <CardContent className="p-4">
                            <Calendar
                                mode="range"
                                selected={
                                    date
                                        ? {
                                              from: date,
                                              to: getNextSunday(date),
                                          }
                                        : undefined
                                }
                                onSelect={(_, triggerDate) => {
                                    if (triggerDate) {
                                        setDate(getMonday(triggerDate));
                                    }
                                }}
                                disabled={{
                                    before: getUpcomingMonday(),
                                }}
                                numberOfMonths={1}
                            />
                        </CardContent>
                    </Card>
                    <Button
                        onClick={handleAutoGenerate}
                        className="w-full"
                        size="lg"
                        disabled={isLoading || !!dishError}
                    >
                        Auto Generate Menu
                    </Button>
                    {/* Error Message */}
                    {errorMessage && (
                        <Alert variant="destructive">
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    )}
                </div>
                <Card className="flex-1  border-0 bg-gray-50">
                    <CardContent className="p-6 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {menu.map(({ day, dish }) => (
                                <div key={day} className="bg-white rounded-lg shadow-sm p-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Badge
                                                variant="secondary"
                                                className="bg-[#FFF5ED] text-black hover:bg-[#FFF5ED]"
                                            >
                                                {day}
                                            </Badge>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-muted-foreground">
                                                    {dish?.calories} cal
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 p-0.5"
                                                    onClick={toggleDayOff}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div
                                            onClick={() => openRecommendationModal(day)}
                                            className="cursor-pointer space-y-3 transition-all duration-200 hover:scale-105"
                                        >
                                            <h3 className="font-semibold">{dish?.name}</h3>
                                            <div className="relative rounded-lg aspect-[4/3] overflow-hidden">
                                                <img
                                                    src={dish?.image || '/menu-placeholder.jpg'}
                                                    alt={dish?.name}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {dish?.ingredients.map((ingredient) => (
                                                    <Badge
                                                        key={ingredient}
                                                        variant="outline"
                                                        className="bg-white text-xs font-normal"
                                                    >
                                                        {ingredient}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            {isModalOpen && (
                <DishRecommendationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSelect={handleDishSelect}
                    // currentDish={menu.find((assignment) => assignment.day === selectedDay)?.dish}
                />
            )}
        </div>
    );
}

export default MenuPage;
