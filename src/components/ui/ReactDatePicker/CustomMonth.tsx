import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {JSX} from "react";

interface CustomMonthProps {
    currentMonth: Date;
    selectedDates: { startDate: Date | null; endDate: Date | null };
    handleDateSelect: (date: Date) => void;
    handleNextMonth: () => void;
    handlePreviousMonth: () => void;
    isDateInRange: (date: Date) => boolean;
    isStartOrEndDate: (date: Date) => boolean;
}

export const CustomMonth: ({
                               currentMonth,
                               selectedDates,
                               handleDateSelect,
                               handleNextMonth,
                               handlePreviousMonth,
                               isDateInRange,
                               isStartOrEndDate
                           }: CustomMonthProps) => JSX.Element = ({
                                                            currentMonth,
                                                            selectedDates,
                                                            handleDateSelect,
                                                            handleNextMonth,
                                                            handlePreviousMonth,
                                                            isDateInRange,
                                                            isStartOrEndDate
                                                        }) => {
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const startDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    const daysArray = Array.from({ length: startDayOfWeek + daysInMonth }, (_, i) =>
        i >= startDayOfWeek ? i - startDayOfWeek + 1 : null
    );

    return (
        <div className="w-[320px]">
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePreviousMonth}>
                    <ChevronLeft className="w-6 h-6 text-gray-500" />
                </button>
                <h3 className="text-lg font-semibold">{format(currentMonth, "MMM yyyy")}</h3>
                <button onClick={handleNextMonth}>
                    <ChevronRight className="w-6 h-6 text-gray-500" />
                </button>
            </div>
            <div className="grid grid-cols-7 text-center gap-y-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                    <div key={index} className="text-sm text-gray-500">{day}</div>
                ))}
                {daysArray.map((day, i) => {
                    if (!day) return <div key={`empty-${i}`}></div>;

                    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                    const isInRange = isDateInRange(date);
                    const isStartOrEnd = isStartOrEndDate(date);

                    return (
                        <div
                            key={`${day}-${i}`}
                            className={`text-sm cursor-pointer p-2 rounded-full 
                                ${isStartOrEnd ? "bg-blue-500 text-white font-semibold" : isInRange ? "bg-blue-100" : ""}`}
                            onClick={() => handleDateSelect(date)}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
