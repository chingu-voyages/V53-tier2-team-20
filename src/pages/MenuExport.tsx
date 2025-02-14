import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Download } from 'lucide-react';
import { useState } from 'react';
import { WeeklyMenu } from '@/types';
import { exportToExcel, exportToPDF } from '@/lib/utils';

interface MenuExportProps {
    selectedWeek: Date | undefined;
    menu: WeeklyMenu;
    hasMenuForWeek: (date: Date) => boolean;
}

function MenuExport({ selectedWeek, menu, hasMenuForWeek }: MenuExportProps) {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async (type: 'pdf' | 'excel') => {
        if (!selectedWeek) return;

        setIsExporting(true);
        try {
            if (type === 'pdf') {
                await exportToPDF(selectedWeek, menu);
            } else {
                await exportToExcel(selectedWeek, menu);
            }
        } catch (error) {
            console.error('Failed to export:', error);
        } finally {
            setIsExporting(false);
        }
    };
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    disabled={
                                        !selectedWeek ||
                                        !hasMenuForWeek(selectedWeek) ||
                                        isExporting
                                    }
                                >
                                    <Download className="h-4 w-4" />
                                    {isExporting ? 'Exporting...' : 'Export Menu'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleExport('pdf')}>
                                    Export as PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleExport('excel')}>
                                    Export as Excel
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    {!selectedWeek
                        ? 'Select a week first'
                        : !hasMenuForWeek(selectedWeek)
                          ? 'Generate a menu before exporting'
                          : 'Export your menu'}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default MenuExport;
