import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDishesStore } from '@/store/dishStore';
import { SkeletonCard } from '@/components/SkeletonCard';

export default function DishesPage() {
    const { dishes, isLoading, error, fetchDishes } = useDishesStore();

    // Create a fixed array of skeleton placeholders
    const skeletonPlaceholders = Array.from({ length: 6 }, (_, index) => index);

    useEffect(() => {
        fetchDishes();
    }, [fetchDishes]);

    if (error) {
        return (
            <div className="p-6 w-full flex justify-center items-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-6 w-full">
            <h2 className="mb-6 text-xl font-semibold">Available Dishes</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {isLoading
                    ? skeletonPlaceholders.map((index) => (
                          <SkeletonCard key={`skeleton-${index}`} />
                      ))
                    : dishes.map((dish) => (
                          <div
                              key={dish.id}
                              className="transition-all duration-300 ease-in-out hover:shadow-lg"
                          >
                              <Card className="shadow-md h-full border border-gray-200">
                                  <CardHeader className="pb-3">
                                      <CardTitle className="text-lg font-semibold">
                                          {dish.name}
                                      </CardTitle>
                                  </CardHeader>
                                  <CardContent className="flex flex-col">
                                      <div className="space-y-2">
                                          <div>
                                              <h3 className="text-sm font-medium text-gray-500">
                                                  Ingredients:
                                              </h3>
                                              <p className="text-sm">
                                                  {dish.ingredients.join(', ')}
                                              </p>
                                          </div>
                                          <div className="flex items-center justify-between">
                                              <span className="text-sm font-medium text-gray-500">
                                                  Calories:
                                              </span>
                                              <span className="text-sm font-bold text-primary">
                                                  {dish.calories}
                                              </span>
                                          </div>
                                      </div>
                                  </CardContent>
                              </Card>
                          </div>
                      ))}
            </div>
        </div>
    );
}
