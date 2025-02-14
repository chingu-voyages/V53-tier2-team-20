import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getMonday, getNextSunday, getUpcomingMonday } from '@/lib/utils';
import { useMenuStore } from '@/store/menuStore';
import { useErrorStore } from '@/store/errorStore';

interface CalendarSectionProps {
    onAutoGenerate: () => void;
    isButtonDisabled: boolean;
    hasMenuForWeek: (date: Date) => boolean;
}

function CalendarSection({
    onAutoGenerate,
    isButtonDisabled,
    hasMenuForWeek,
}: CalendarSectionProps) {
    const { selectedWeek, setSelectedWeek } = useMenuStore();
    const { errorMessage } = useErrorStore();

    return (
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
                    onClick={onAutoGenerate}
                    className="w-full"
                    size="lg"
                    disabled={isButtonDisabled}
                >
                    {hasMenuForWeek(selectedWeek) ? 'Regenerate Menu' : 'Auto Generate Menu'}
                </Button>
            )}

            {/* Error Message */}
            {errorMessage && (
                <Alert variant="destructive">
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}

export default CalendarSection;
