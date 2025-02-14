import { AllergyItem, DayAssignment, Dish, MenuGenerationResult, WeeklyMenu } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DAYS_OF_WEEK } from './constant';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getUpcomingMonday = (): Date => {
    const today = new Date();

    const day = today.getDay();
    //
    const daysToAdd = day === 0 ? 1 : 8 - day;

    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysToAdd);
    return nextMonday;
};

export const getNextSunday = (monday: Date): Date => {
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return sunday;
};

export const getMonday = (triggerDate: Date): Date => {
    // Use the actual clicked date from triggerDate
    const selectedDate = new Date(triggerDate);
    const day = selectedDate.getDay(); // 0-6

    const daysToSubtract = day === 0 ? 6 : day - 1;

    const monday = new Date(selectedDate);
    monday.setDate(selectedDate.getDate() - daysToSubtract);
    return monday;
};

export const formatWeekRange = (date: Date) => {
    return `${format(date, 'MMM d')} - ${format(getNextSunday(date), 'MMM d, yyyy')}`;
};

export const getWeekKey = (date: Date) => format(getMonday(date), 'yyyy-MM-dd');

export const getRandomDish = (availableDishes: Dish[]): Dish => {
    const randomIndex = Math.floor(Math.random() * availableDishes.length);
    return availableDishes[randomIndex];
};

export const assignDishToDay = (dish?: Dish): DayAssignment => {
    return {
        dish,
        isDayOff: !dish, // if no dish, it's a day off
    };
};

export const getSafeDishes = (dishes: Dish[], allergies: AllergyItem[]): Dish[] => {
    return dishes.filter((dish) => {
        return !dish.ingredients.some((ingredient) =>
            allergies.some((allergy) =>
                ingredient.toLowerCase().includes(allergy.name.toLowerCase())
            )
        );
    });
};

export const generateWeeklyMenu = (
    dishes: Dish[],
    allergies: AllergyItem[]
): MenuGenerationResult => {
    const safeDishes = getSafeDishes(dishes, allergies);

    if (safeDishes.length < 7) {
        throw new Error('Not enough safe dishes available after filtering allergens');
    }

    const availableDishes = [...safeDishes];
    const menu: WeeklyMenu = {} as WeeklyMenu;

    // Assign dishes to each day
    DAYS_OF_WEEK.forEach((day) => {
        const dish = getRandomDish(availableDishes);
        // Remove the selected dish here
        availableDishes.splice(availableDishes.indexOf(dish), 1);
        menu[day] = assignDishToDay(dish);
    });

    return {
        menu,
        remainingDishes: availableDishes,
    };
};

export const getRecommendedDishes = (availableDishes: Dish[], count = 5): Dish[] => {
    const dishes = [...availableDishes];
    const recommendedDishes: Dish[] = [];

    while (recommendedDishes.length < count && dishes.length > 0) {
        const dish = getRandomDish(dishes);
        recommendedDishes.push(dish);
        dishes.splice(dishes.indexOf(dish), 1);
    }

    return recommendedDishes;
};

export const exportToPDF = async (selectedWeek: Date, menu: WeeklyMenu) => {
    // Dynamically import jsPDF
    const { default: jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    // 1. Create new PDF document (A4 format by default)
    // const doc = new jsPDF();

    // 2. Configure header
    doc.setFontSize(20);
    doc.text('Weekly Menu Plan', 20, 20); // x=20, y=20 position

    // 3. Add week range
    doc.setFontSize(14);
    doc.text(`Week of ${formatWeekRange(selectedWeek as Date)}`, 20, 30);

    // 4. Add menu items
    doc.setFontSize(12);
    let yPosition = 50; // Start position for menu items

    Object.entries(menu).forEach(([day, dayMenu]) => {
        // Day header
        doc.setFont('helvetica', 'bold');
        doc.text(day, 20, yPosition);

        if (dayMenu.isDayOff) {
            doc.setFont('helvetica', 'normal');
            doc.text('Day Off', 60, yPosition);
        } else {
            // Dish details
            doc.setFont('helvetica', 'normal');
            doc.text(dayMenu.dish?.name || '', 60, yPosition);
            doc.text(`${dayMenu.dish?.calories || 0} cal`, 150, yPosition);

            // Ingredients on next line
            if (dayMenu.dish?.ingredients.length) {
                yPosition += 7;
                doc.setFontSize(10);
                doc.text(`Ingredients: ${dayMenu.dish.ingredients.join(', ')}`, 60, yPosition, {
                    maxWidth: 130, // Wrap text if too long
                });
                doc.setFontSize(12);
            }
        }

        yPosition += 20; // Space between days

        // Add new page if needed
        if (yPosition > 280) {
            doc.addPage();
            yPosition = 20;
        }
    });

    // 5. Save the PDF
    const fileName = `menu-${format(selectedWeek as Date, 'yyyy-MM-dd')}.pdf`;
    doc.save(fileName);
};

export const exportToExcel = async (selectedWeek: Date, menu: WeeklyMenu) => {
    const XLSX = await import('xlsx');

    // 1. Prepare data as array of arrays (headers + rows)
    const wsData = [
        // Headers row
        ['Day', 'Dish Name', 'Calories', 'Ingredients', 'Status'],

        // Data rows
        ...Object.entries(menu).map(([day, dayMenu]) => [
            day,
            dayMenu.isDayOff ? '' : dayMenu.dish?.name,
            dayMenu.isDayOff ? '' : dayMenu.dish?.calories,
            dayMenu.isDayOff ? '' : dayMenu.dish?.ingredients.join(', '),
            dayMenu.isDayOff ? 'Day Off' : 'Planned',
        ]),
    ];

    // 2. Create worksheet from data
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // 3. Style the worksheet (optional)
    ws['!cols'] = [
        { wch: 10 }, // Day column width
        { wch: 30 }, // Dish name column width
        { wch: 10 }, // Calories column width
        { wch: 50 }, // Ingredients column width
        { wch: 10 }, // Status column width
    ];

    // 4. Create workbook and append worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Weekly Menu');

    // 5. Save file
    const fileName = `menu-${format(selectedWeek as Date, 'yyyy-MM-dd')}.xlsx`;
    XLSX.writeFile(wb, fileName);
};
