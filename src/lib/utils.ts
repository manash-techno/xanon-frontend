import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {format, isValid, parse} from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    }.bind(this);
}

export function formatShortDate(date: Date) {
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function formatTime(
    date: Date,
    options?: {
        hour12?: boolean;
        showSeconds?: boolean;
        padHour?: boolean;
        uppercaseAMPM?: boolean;
    }
): string {
    const {
        hour12 = true,
        showSeconds = false,
        padHour = false,
        uppercaseAMPM = false,
    } = options || {};

    const formatOptions: Intl.DateTimeFormatOptions = {
        hour: padHour ? "2-digit" : "numeric",
        minute: "2-digit",
        second: showSeconds ? "2-digit" : undefined,
        hour12: hour12,
    };

    let formattedTime = date.toLocaleTimeString("en-US", formatOptions);

    if (!uppercaseAMPM && hour12) {
        formattedTime = formattedTime.replace(/AM|PM/, (match) =>
            match.toLowerCase()
        );
    }

    return formattedTime;
}


export const parseDateToStandardFormat = (dateString?: string | null): string | undefined => {
    if (!dateString) return undefined;

    const possibleFormats = [
        "yyyy-MM-dd", "MM/dd/yyyy", "dd/MM/yyyy", "MMM dd, yyyy", "MMMM dd, yyyy",
        "dd-MM-yyyy", "yyyy/MM/dd", "EEE MMM dd yyyy", "dd MMM yyyy", "yyyyMMdd",
        "dd.MM.yyyy", "MMM d, yyyy", "MMMM d, yyyy", "dd MMMM yyyy", "d MMM yyyy",
    ];

    for (const formatString of possibleFormats) {
        const parsedDate = parse(dateString, formatString, new Date());

        if (isValid(parsedDate)) {
            return format(parsedDate, "yyyy-MM-dd");
        }
    }

    return undefined; // If no valid format is detected
};