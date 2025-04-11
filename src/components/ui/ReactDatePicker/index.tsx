import {useState, useEffect, useRef, useMemo, JSX} from "react";
import { addMonths, subMonths, format } from "date-fns";
import { ReactDropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/ReactDropdownMenu.tsx";
import { ChevronDown } from "lucide-react";
import { ReactButton } from "@/components/ui/ReactButton";
import { CustomMonth } from "@/components/ui/ReactDatePicker/CustomMonth.tsx";
import { getPredefinedRangeDates, PredefinedRange } from "@/components/ui/ReactDatePicker/dateUtils.ts";

interface ReactDatePickerProps {
    onDateRangeChange: (range: { from: string|null; to: string|null, label: string|null }) => void;
    className?: string;
    from?: string|null;
    to?: string|null;
    label?: string|null;
}

export const ReactDatePicker = ({ onDateRangeChange, className, from, to, label }: ReactDatePickerProps) => {
    const [selectedLabel, setSelectedLabel] = useState<string | null>(() => {
        if (label) return label; // ✅ Use provided label if available
        if (!from && !to) return "Custom"; // ✅ Default to menu item if no dates are provided
        const predefinedRange = Object.entries(getPredefinedRangeDates).find(
            ([_, range]) => range.from === from && range.to === to
        );
        return predefinedRange ? predefinedRange[0] : null;
    });

    const [dateRange, setDateRange] = useState<{ from: string | null; to: string | null }>(() => ({
        from: from || null,
        to: to || null,
    }));
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [selectedDates, setSelectedDates] = useState<{ startDate: Date | null; endDate: Date | null }>({
        startDate: null,
        endDate: null
    });
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const calendarRef = useRef<HTMLDivElement|null>(null);

    // Close calendar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setShowCalendar(false);
            }
        };

        if (showCalendar) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showCalendar]);

    const handlePredefinedRange = (range: PredefinedRange) => {
        setSelectedLabel(range); // Store selected range label

        if (range === "Custom") {
            setShowCalendar(true);
            setSelectedLabel(null); // Reset label for custom
        } else {
            setShowCalendar(false);
            const selectedDate = getPredefinedRangeDates(range);
            setDateRange(selectedDate);
            onDateRangeChange({ ...selectedDate, label: range });
        }
    };


    // Handle selecting a date range
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
            const from = format(selectedDates.startDate, "yyyy-MM-dd");
            const to = format(selectedDates.endDate, "yyyy-MM-dd");
            setDateRange({ from, to });

            onDateRangeChange({ from, to, label: null });
        }
        setShowCalendar(false);
    };

    const handleClear = () => {
        setSelectedDates({ startDate: null, endDate: null });
        setDateRange(null);
        setSelectedLabel(null);
        onDateRangeChange({ from: null, to: null, label: null });
    };

    const handleCancel = () => {
        setShowCalendar(false);
    };

    const isDateInRange = (date: Date): boolean => {
        const { startDate, endDate } = selectedDates;
        return startDate !== null && endDate !== null && date >= startDate && date <= endDate;
    };

    const isStartOrEndDate = (date: Date): boolean => {
        const { startDate, endDate } = selectedDates;
        return (
            (startDate && date.getTime() === startDate.getTime()) ||
            (endDate && date.getTime() === endDate.getTime())
        ) as boolean;
    };

    const formatReadableDate = (from: string, to: string) => {
        return `${format(new Date(from), "MMM d, yyyy")} - ${format(new Date(to), "MMM d, yyyy")}`;
    };

    const formattedDateLabel: string | JSX.Element = useMemo(() => {
        if (!(dateRange?.from && dateRange?.to)) return <span className="text-[#B4B4B4] font-normal text-sm leading-[150%] tracking-[-1%]">Select Date Range</span>;
        if (selectedLabel) return selectedLabel;
        if (dateRange?.from && dateRange?.to) return formatReadableDate(dateRange.from, dateRange.to);
        return <span className="text-[#B4B4B4] font-normal text-sm leading-[150%] tracking-[-1%]">Select Date Range</span>;
    }, [selectedLabel, dateRange?.from, dateRange?.to]);

    return (
        <div className={`relative ${className}`}>
            <ReactDropdownMenu>
                <DropdownMenuTrigger asChild>
                    <ReactButton variant="outline" className="w-full md:w-60 justify-between p-2.5 text-sm">
                        {formattedDateLabel}
                        <ChevronDown className="ml-2 h-5 w-5" />
                    </ReactButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-full md:w-60">
                    {["Today", "Yesterday", "Last 7 days", "Last 30 days", "Month to date", "Previous month", "Custom"].map(range => (
                        <DropdownMenuItem key={range} onSelect={() => handlePredefinedRange(range as PredefinedRange)}>
                            {range}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </ReactDropdownMenu>

            {showCalendar && (
                <div ref={calendarRef} className="absolute top-12 z-20 bg-white p-4 shadow-lg rounded-md">
                    <CustomMonth
                        currentMonth={currentMonth}
                        selectedDates={selectedDates}
                        handleDateSelect={handleDateSelect}
                        handleNextMonth={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        handlePreviousMonth={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        isDateInRange={isDateInRange}
                        isStartOrEndDate={isStartOrEndDate}
                    />

                    {/* Action Buttons */}
                    <div className="flex justify-end mt-4 space-x-4">
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md" onClick={handleClear}>
                            Clear
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleApply}>
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
