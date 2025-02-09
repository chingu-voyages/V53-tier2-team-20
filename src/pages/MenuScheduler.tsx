import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { generateWeeklyMenu, getMonday, getNextSunday, getUpcomingMonday } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Dish, WeeklyMenu } from '@/types';
import { useDishesStore } from '@/store/dishStore';

// const mockMenu: WeeklyMenu = [
//     {
//         day: 'Monday',
//         dish: {
//             id: 1,
//             name: 'Vegetable Stir Fry',
//             calories: 298,
//             ingredients: ['Vanilla', 'Bread', 'Parsley', 'Zucchini'],
//             image: '/menu-placeholder.jpg',
//         },
//     },
//     {
//         day: 'Tuesday',
//         dish: {
//             id: 2,
//             name: 'Vegetable Stir Fry',
//             calories: 298,
//             ingredients: ['Vanilla', 'Bread', 'Parsley', 'Zucchini'],
//             image: '/menu-placeholder.jpg',
//         },
//     },
//     {
//         day: 'Wednesday',
//         dish: {
//             id: 3,
//             name: 'Vegetable Stir Fry',
//             calories: 298,
//             ingredients: ['Vanilla', 'Bread', 'Parsley', 'Zucchini'],
//             image: '/menu-placeholder.jpg',
//         },
//     },
//     {
//         day: 'Thursday',
//         dish: {
//             id: 4,
//             name: 'Vegetable Stir Fry',
//             calories: 298,
//             ingredients: ['Vanilla', 'Bread', 'Parsley', 'Zucchini'],
//             image: '/menu-placeholder.jpg',
//         },
//     },
//     {
//         day: 'Friday',
//         dish: {
//             id: 5,
//             name: 'Vegetable Stir Fry',
//             calories: 298,
//             ingredients: ['Vanilla', 'Bread', 'Parsley', 'Zucchini'],
//             image: '/menu-placeholder.jpg',
//         },
//     },
//     {
//         day: 'Saturday',
//         dish: {
//             id: 6,
//             name: 'Vegetable Stir Fry',
//             calories: 298,
//             ingredients: ['Vanilla', 'Bread', 'Parsley', 'Zucchini'],
//             image: '/menu-placeholder.jpg',
//         },
//     },
//     {
//         day: 'Sunday',
//         dish: {
//             id: 7,
//             name: 'Vegetable Stir Fry',
//             calories: 298,
//             ingredients: ['Vanilla', 'Bread', 'Parsley', 'Zucchini'],
//             image: '/menu-placeholder.jpg',
//         },
//     },
// ];

function MenuPage() {
    const [date, setDate] = useState<Date | undefined>(getUpcomingMonday());
    const [menu, setWeeklyMenu] = useState<WeeklyMenu>([]);
    const [availableDishes, setAvaialbleDishes] = useState<Dish[]>([]);

    const { dishes, isLoading, error, fetchDishes } = useDishesStore();

    console.log(JSON.stringify(dishes, null, 2));

    useEffect(() => {
        fetchDishes();
    }, [fetchDishes]);

    const handleAutoGenerate = () => {
        const { menu, remainingDishes } = generateWeeklyMenu(dishes);
        setWeeklyMenu(menu);
        setAvaialbleDishes(remainingDishes);
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
                        disabled={isLoading || !!error || dishes.length < 7}
                    >
                        Auto Generate Menu
                    </Button>
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
                                            <span className="text-sm text-muted-foreground">
                                                {dish?.calories} cal
                                            </span>
                                        </div>
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
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default MenuPage;
