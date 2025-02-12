import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    formatWeekRange,
    generateWeeklyMenu,
    getMonday,
    getNextSunday,
    getRandomDish,
    getUpcomingMonday,
    getWeekKey,
} from '@/lib/utils';
import { useEffect, useState } from 'react';
import { DayOfWeek, Dish, GeneratedMenus, WeeklyMenu } from '@/types';
import { useDishesStore } from '@/store/dishStore';
import { useAllergyStore } from '@/store/allergyStore';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X } from 'lucide-react';
import DishRecommendationModal from './DishRecommendationModal';
import { format } from 'date-fns';

function MenuPage() {
    const [selectedWeek, setSelectedWeek] = useState<Date | undefined>(getUpcomingMonday());

    const [menu, setWeeklyMenu] = useState<WeeklyMenu>({
        // Active menu
        Monday: { isDayOff: false },
        Tuesday: { isDayOff: false },
        Wednesday: { isDayOff: false },
        Thursday: { isDayOff: false },
        Friday: { isDayOff: false },
        Saturday: { isDayOff: false },
        Sunday: { isDayOff: false },
    });
    // Add new state to store all generated menus
    const [generatedMenus, setGeneratedMenus] = useState<GeneratedMenus>({});
    const [availableDishes, setAvaialbleDishes] = useState<Dish[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
    const [isMenuGenerated, setIsMenuGenerated] = useState(false);

    const { dishes, isLoading, error: dishError, fetchDishes } = useDishesStore();
    const { allergies } = useAllergyStore();

    const toggleDayOff = (day: DayOfWeek) => {
        if (!selectedWeek) return;

        const newMenu = { ...menu };
        const currentDayAssignment = newMenu[day];

        const newAvailableDishes = [...availableDishes];

        if (currentDayAssignment.isDayOff) {
            if (newAvailableDishes.length > 0) {
                const dish = getRandomDish(newAvailableDishes);

                newMenu[day] = {
                    dish,
                    isDayOff: false,
                };

                const selectedIndex = newAvailableDishes.findIndex((d) => d.id === dish.id);
                if (selectedIndex !== -1) {
                    newAvailableDishes.splice(selectedIndex, 1);
                }
            }
        } else {
            const removedDish = currentDayAssignment.dish;
            newMenu[day] = {
                dish: undefined,
                isDayOff: true,
            };
            if (removedDish) {
                newAvailableDishes.push(removedDish);
            }
        }

        setAvaialbleDishes(newAvailableDishes);
        setWeeklyMenu(newMenu);
        const weekKey = getWeekKey(selectedWeek);
        setGeneratedMenus((prev) => ({
            ...prev,
            [weekKey]: newMenu,
        }));
    };

    const openRecommendationModal = (day: DayOfWeek) => {
        setSelectedDay(day);
        setIsModalOpen(true);
    };

    const handleDishSelect = (dish: Dish) => {
        if (!selectedDay || !selectedWeek) return;

        const newMenu: WeeklyMenu = { ...menu };
        const oldDish = newMenu[selectedDay].dish;
        newMenu[selectedDay] = { ...newMenu[selectedDay], dish };

        // Update both active menu and cache
        setWeeklyMenu(newMenu);
        const weekKey = getWeekKey(selectedWeek);
        setGeneratedMenus((prev) => ({
            ...prev,
            [weekKey]: newMenu,
        }));

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
        if (selectedWeek) {
            const weekKey = getWeekKey(selectedWeek);
            const cachedMenu = generatedMenus[weekKey];

            if (cachedMenu) {
                setWeeklyMenu(cachedMenu);
                setIsMenuGenerated(true);
            } else {
                // Reset to empty menu when no cache exists
                setWeeklyMenu({
                    Monday: { isDayOff: false },
                    Tuesday: { isDayOff: false },
                    Wednesday: { isDayOff: false },
                    Thursday: { isDayOff: false },
                    Friday: { isDayOff: false },
                    Saturday: { isDayOff: false },
                    Sunday: { isDayOff: false },
                });
                setIsMenuGenerated(false);
            }
        }
    }, [selectedWeek, generatedMenus]);

    useEffect(() => {
        fetchDishes();
    }, [fetchDishes]);

    // Clear error when dishes or allergies change
    useEffect(() => {
        setErrorMessage('');
    }, [dishes, allergies, selectedWeek]);

    useEffect(() => {
        if (dishError) {
            setErrorMessage(dishError);
        }
    }, [dishError]);

    const hasMenuForWeek = (date: Date) => !!generatedMenus[getWeekKey(date)];

    const handleAutoGenerate = () => {
        try {
            // Clear any previous errors
            setErrorMessage('');

            if (!selectedWeek) {
                throw new Error('Please select a week before generating the menu');
            }

            const { menu, remainingDishes } = generateWeeklyMenu(dishes, allergies);
            const weekKey = getWeekKey(selectedWeek);
            // store the menu
            setGeneratedMenus((prev) => ({
                ...prev,
                [weekKey]: menu,
            }));
            setWeeklyMenu(menu);
            setAvaialbleDishes(remainingDishes);
            setIsMenuGenerated(true);
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : 'Failed to generate menu');
        }
    };

    const isButtonDisabled = isLoading || !!dishError || !selectedWeek;

    return (
        <div className="container p-6">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-[300px] space-y-4">
                    <Card>
                        <CardContent className="p-4">
                            <Calendar
                                mode="range"
                                selected={
                                    selectedWeek
                                        ? {
                                              from: selectedWeek,
                                              to: getNextSunday(selectedWeek),
                                          }
                                        : undefined
                                }
                                onSelect={(_, triggerDate) => {
                                    if (triggerDate) {
                                        setSelectedWeek(getMonday(triggerDate));
                                    }
                                }}
                                disabled={{
                                    before: getUpcomingMonday(),
                                }}
                                numberOfMonths={1}
                            />
                        </CardContent>
                    </Card>
                    {selectedWeek && (
                        <Button
                            onClick={handleAutoGenerate}
                            className="w-full"
                            size="lg"
                            disabled={isButtonDisabled}
                        >
                            {hasMenuForWeek(selectedWeek)
                                ? 'Regenerate Menu'
                                : 'Auto Generate Menu'}
                        </Button>
                    )}

                    {/* Error Message */}
                    {errorMessage && (
                        <Alert variant="destructive">
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    )}
                </div>
                <Card className="flex-1  border-0 bg-gray-50">
                    <CardHeader className="pb-0">
                        <CardTitle>
                            <h2 className="text-xl sm:text-2xl font-semibold">Weekly Menu</h2>
                        </CardTitle>
                        {selectedWeek && hasMenuForWeek(selectedWeek) && (
                            <p
                                className="text-muted-foreground text-sm"
                                aria-label={`Menu for week of ${format(selectedWeek, 'MMMM d, yyyy')}`}
                            >
                                Menu for: {formatWeekRange(selectedWeek)}
                            </p>
                        )}
                    </CardHeader>
                    {/* Menu display logic */}
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
                                                    {!dayAssignment.isDayOff && (
                                                        <span className="text-sm text-muted-foreground">
                                                            {dayAssignment.dish?.calories} cal
                                                        </span>
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6 p-0.5"
                                                        onClick={() =>
                                                            toggleDayOff(day as DayOfWeek)
                                                        }
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            {dayAssignment.isDayOff ? (
                                                <div className="flex items-center justify-center h-[200px]">
                                                    <span className="text-lg font-semibold text-gray-500">
                                                        Day Off
                                                    </span>
                                                </div>
                                            ) : (
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
                                            )}
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
