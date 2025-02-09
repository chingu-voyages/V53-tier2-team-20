import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
// import { MenuItem } from '@/types';

interface MenuItem {
    name: string;
    calories: number;
    ingredients: string[];
    image: string;
}

const mockMenu: Record<string, MenuItem> = {
    Monday: {
        name: 'Vegetable Stir Fry',
        calories: 298,
        ingredients: ['Vanilla', 'Bread', 'Parsley', 'Zucchini'],
        image: '/menu-placeholder.jpg',
    },
    Tuesday: {
        name: 'Vegetable Stir Fry',
        calories: 298,
        ingredients: ['Vanilla', 'Bread', 'Parsley', 'Zucchini'],
        image: '/menu-placeholder.jpg',
    },
    Wednesday: {
        name: 'Vegetable Stir Fry',
        calories: 298,
        ingredients: ['Vanilla', 'Bread', 'Parsley', 'Zucchini'],
        image: '/menu-placeholder.jpg',
    },
    Thursday: {
        name: 'Vegetable Stir Fry',
        calories: 298,
        ingredients: ['Vanilla', 'Bread', 'Parsley', 'Zucchini'],
        image: '/menu-placeholder.jpg',
    },
    Friday: {
        name: 'Vegetable Stir Fry',
        calories: 298,
        ingredients: ['Vanilla', 'Bread', 'Parsley', 'Zucchini'],
        image: '/menu-placeholder.jpg',
    },
    Saturday: {
        name: 'Vegetable Stir Fry',
        calories: 298,
        ingredients: ['Vanilla', 'Bread', 'Parsley', 'Zucchini'],
        image: '/menu-placeholder.jpg',
    },
    Sunday: {
        name: 'Vegetable Stir Fry',
        calories: 298,
        ingredients: ['Vanilla', 'Bread', 'Parsley', 'Zucchini'],
        image: '/menu-placeholder.jpg',
    },
};

function MenuPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
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
                                              to: new Date(
                                                  date.getTime() + 6 * 24 * 60 * 60 * 1000
                                              ),
                                          }
                                        : undefined
                                }
                                onSelect={(range) => setDate(range?.from)}
                                numberOfMonths={1}
                            />
                        </CardContent>
                    </Card>
                    <Button className="w-full" size="lg">
                        Auto Generate Menu
                    </Button>
                </div>
                <Card className="flex-1  border-0 bg-gray-50">
                    <CardContent className="p-6 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {Object.entries(mockMenu).map(([day, item]) => (
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
                                                {item.calories} cal
                                            </span>
                                        </div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <div className="relative rounded-lg aspect-[4/3] overflow-hidden">
                                            <img
                                                src={item.image || '/menu-placeholder.jpg'}
                                                alt={item.name}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {item.ingredients.map((ingredient) => (
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
