import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
    type?: string;
};

export const ReactInput = forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", type = "text", ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

ReactInput.displayName = "Input";
