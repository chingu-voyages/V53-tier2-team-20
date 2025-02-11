import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { generateWeeklyMenu, getMonday, getNextSunday, getUpcomingMonday } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { DayOfWeek, Dish, WeeklyMenu } from '@/types';
import { useDishesStore } from '@/store/dishStore';
import { useAllergyStore } from '@/store/allergyStore';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X } from 'lucide-react';
import DishRecommendationModal from './DishRecommendationModal';

function MenuPage() {
    const [date, setDate] = useState<Date | undefined>(getUpcomingMonday());
    const [menu, setWeeklyMenu] = useState<WeeklyMenu>({
        Monday: { isDayOff: false },
        Tuesday: { isDayOff: false },
        Wednesday: { isDayOff: false },
        Thursday: { isDayOff: false },
        Friday: { isDayOff: false },
        Saturday: { isDayOff: false },
        Sunday: { isDayOff: false },
    });
    const [availableDishes, setAvaialbleDishes] = useState<Dish[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
    const [isMenuGenerated, setIsMenuGenerated] = useState(false);

    const { dishes, isLoading, error: dishError, fetchDishes } = useDishesStore();
    const { allergies } = useAllergyStore();

    const toggleDayOff = () => {};

    const openRecommendationModal = (day: DayOfWeek) => {
        setSelectedDay(day);
        setIsModalOpen(true);
    };

    const handleDishSelect = (dish: Dish) => {
        if (!selectedDay) return;

        const newMenu: WeeklyMenu = { ...menu };
        const oldDish = newMenu[selectedDay].dish;
        newMenu[selectedDay] = { ...newMenu[selectedDay], dish };
        setWeeklyMenu(newMenu);

        //update avaialbe dishes
        const newAvailableDishes = [...availableDishes];
        // Remove selected dish
        const selectedIndex = newAvailableDishes.findIndex((d) => d.id === dish.id);
        if (selectedIndex !== -1) {
            newAvailableDishes.splice(selectedIndex, 1);
        }
        // Add back old dish if existed
        if (oldDish) {
            newAvailableDishes.push(oldDish);
        }
        setAvaialbleDishes(newAvailableDishes);

        // Reset states
        setIsModalOpen(false);
        setSelectedDay(null);
    };

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
            setIsMenuGenerated(true);
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
                        {isMenuGenerated && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {Object.entries(menu).map(([day, dayAssignment]) => (
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
                                                        {dayAssignment.dish?.calories} cal
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
                                                onClick={() =>
                                                    openRecommendationModal(day as DayOfWeek)
                                                }
                                                className="cursor-pointer space-y-3 transition-all duration-200 hover:scale-105"
                                            >
                                                <h3 className="font-semibold">
                                                    {dayAssignment.dish?.name}
                                                </h3>
                                                <div className="relative rounded-lg aspect-[4/3] overflow-hidden">
                                                    <img
                                                        src={
                                                            dayAssignment.dish?.image ||
                                                            '/menu-placeholder.jpg'
                                                        }
                                                        alt={dayAssignment.dish?.name}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {dayAssignment.dish?.ingredients.map(
                                                        (ingredient) => (
                                                            <Badge
                                                                key={ingredient}
                                                                variant="outline"
                                                                className="bg-white text-xs font-normal"
                                                            >
                                                                {ingredient}
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            {isModalOpen && (
                <DishRecommendationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSelect={handleDishSelect}
                    availableDishes={availableDishes}
                />
            )}
        </div>
    );
}

export default MenuPage;
