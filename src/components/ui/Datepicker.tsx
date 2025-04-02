import { useState } from "react";
import { ReactButton } from "@/components/ui/ReactButton.tsx";
import { format, addMonths, subMonths, subDays, addDays } from "date-fns";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ChevronLeft, ChevronRight, Check } from "lucide-react";

interface DatePickerProps {
    onDateRangeChange: (range: string) => void;
}

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

function CustomMonth({
                         currentMonth,
                         selectedDates,
                         handleDateSelect,
                         handleNextMonth,
                         handlePreviousMonth,
                         isDateInRange,
                         isStartOrEndDate,
                     }: {
    currentMonth: Date;
    selectedDates: { startDate: Date | null; endDate: Date | null };
    handleDateSelect: (date: Date) => void;
    handleNextMonth: () => void;
    handlePreviousMonth: () => void;
    isDateInRange: (date: Date) => boolean;
    isStartOrEndDate: (date: Date) => boolean;
}) {
    const startDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

    const daysArray = Array.from({ length: startDayOfWeek + daysInMonth }, (_, i) =>
        i >= startDayOfWeek ? i - startDayOfWeek + 1 : null
    );

    return (
        <div className="w-[320px] p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePreviousMonth}>
                    <ChevronLeft className="w-6 h-6 text-gray-500 dark:text-gray-300" />
                </button>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{format(currentMonth, "MMM yyyy")}</h3>
                <button onClick={handleNextMonth}>
                    <ChevronRight className="w-6 h-6 text-gray-500 dark:text-gray-300" />
                </button>
            </div>
            <div className="grid grid-cols-7 text-center gap-y-2">
                {weekDays.map((day, index) => (
                    <div key={index} className="text-sm text-gray-500 dark:text-gray-300">{day}</div>
                ))}
                {daysArray.map((day, i) => {
                    if (!day) return <div key={`empty-${i}`}></div>;

                    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                    const isInRange = isDateInRange(date);
                    const isStartOrEnd = isStartOrEndDate(date);

                    return (
                        <div
                            key={`${day}-${i}`}
                            className={`text-sm cursor-pointer p-2 rounded-full text-gray-800 dark:text-gray-200 
                                ${isStartOrEnd ? "bg-blue-600 text-white font-semibold" : isInRange ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"}`}
                            onClick={() => handleDateSelect(date)}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function DatePicker({ onDateRangeChange }: DatePickerProps) {
    const [dateRange, setDateRange] = useState<string>("All Date");
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDates, setSelectedDates] = useState<{ startDate: Date | null; endDate: Date | null }>({
        startDate: null,
        endDate: null,
    });
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const handleDateSelect = (date: Date) => {
        const { startDate, endDate } = selectedDates;

        if (!startDate || (startDate && endDate)) {
            setSelectedDates({ startDate: date, endDate: null });
        } else {
            if (date < startDate) {
                setSelectedDates({ startDate: date, endDate: startDate });
            } else {
                setSelectedDates({ startDate, endDate: date });
            }
        }
    };

    const handleApply = () => {
        if (selectedDates.startDate && selectedDates.endDate) {
            setDateRange(`${format(selectedDates.startDate, "MMM d, yyyy")} - ${format(selectedDates.endDate, "MMM d, yyyy")}`);
            onDateRangeChange(
                `${format(addDays(selectedDates.endDate, 1), "yyyy-MM-dd")} / ${format(subDays(selectedDates.startDate, 1), "yyyy-MM-dd")}`
            );
        }
        setShowCalendar(false);
    };

    return (
        <div className="relative">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <ReactButton variant="outline" className="w-60 justify-between p-2.5 text-sm bg-white dark:bg-gray-800 dark:text-gray-300">
                        {dateRange}
                        <ChevronDown className="ml-2 h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </ReactButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-60 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg">
                    {["Today", "Yesterday", "Last 7 days", "Last 30 days", "Month to date", "Previous month", "Custom"].map((label) => (
                        <DropdownMenuItem
                            key={label}
                            onSelect={() => setDateRange(label)}
                            className="px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 flex justify-between items-center cursor-pointer"
                        >
                            {label}
                            {dateRange === label && <Check className="h-4 w-4 text-blue-500" />}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {showCalendar && (
                <div className="absolute top-12 z-20">
                    <CustomMonth
                        currentMonth={currentMonth}
                        selectedDates={selectedDates}
                        handleDateSelect={handleDateSelect}
                        handleNextMonth={handleNextMonth}
                        handlePreviousMonth={handlePreviousMonth}
                        isDateInRange={(date) => selectedDates.startDate && selectedDates.endDate && date >= selectedDates.startDate && date <= selectedDates.endDate}
                        isStartOrEndDate={(date) => selectedDates.startDate?.toDateString() === date.toDateString() || selectedDates.endDate?.toDateString() === date.toDateString()}
                    />
                    <div className="flex justify-end mt-4 space-x-2">
                        <ReactButton onClick={() => setShowCalendar(false)}>Cancel</ReactButton>
                        <ReactButton variant="default" onClick={handleApply}>Apply</ReactButton>
                    </div>
                </div>
            )}
        </div>
    );
}
