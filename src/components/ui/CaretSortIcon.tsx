import { ChevronUp, ChevronDown } from "lucide-react";
import { JSX } from "react";

interface CaretSortIconProps {
    isSorted?: "asc" | "desc" | false;
    className?: string;
}

const CaretSortIcon: ({isSorted, className}: CaretSortIconProps) => JSX.Element = ({ isSorted, className = "h-4 w-4 ml-2" }) => {
    return (
        <span className={className}>
            {isSorted === "asc" ? (
                <ChevronUp className="w-full h-full" />
            ) : isSorted === "desc" ? (
                <ChevronDown className="w-full h-full" />
            ) : (
                <ChevronUp className="w-full h-full opacity-50" />
            )}
        </span>
    );
};

export default CaretSortIcon;
