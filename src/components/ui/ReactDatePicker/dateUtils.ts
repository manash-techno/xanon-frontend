import { format, addDays, subDays, startOfToday, startOfMonth, endOfMonth, subMonths } from "date-fns";

export type PredefinedRange =
    | "Today"
    | "Yesterday"
    | "Last 7 days"
    | "Last 30 days"
    | "Month to date"
    | "Previous month"
    | "Custom";

export const getPredefinedRangeDates = (range: PredefinedRange): { from: string; to: string } => {
    let start: Date, end: Date;

    switch (range) {
        case "Today":
            start = subDays(startOfToday(), 1);
            end = addDays(startOfToday(), 1);
            break;
        case "Yesterday":
            start = subDays(startOfToday(), 2);
            end = startOfToday();
            break;
        case "Last 7 days":
            start = subDays(startOfToday(), 8);
            end = addDays(startOfToday(), 1);
            break;
        case "Last 30 days":
            start = subDays(startOfToday(), 31);
            end = addDays(startOfToday(), 1);
            break;
        case "Month to date":
            start = subDays(startOfMonth(new Date()), 1);
            end = addDays(startOfToday(), 1);
            break;
        case "Previous month":
            start = subDays(startOfMonth(subMonths(new Date(), 1)), 1);
            end = addDays(endOfMonth(subMonths(new Date(), 1)), 1);
            break;
        default:
            return "Custom";
    }

    return { from: format(start, "yyyy-MM-dd"), to: format(end, "yyyy-MM-dd") };
};
