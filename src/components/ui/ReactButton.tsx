import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define button variants properly
export const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-[#0077E5] text-white hover:bg-[#005bb5]",
                ghost: "bg-transparent text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
                outline: "border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
            },
            size: {
                sm: "px-3 py-1.5 text-sm",
                md: "px-4 py-2",
                lg: "px-6 py-3 text-lg",
            },
        },
        defaultVariants: {
            variant: "default" as "default" | "ghost" | "outline", // Ensure TypeScript knows these keys exist
            size: "md" as "sm" | "md" | "lg", // Match exact variant key types
        },
    }
);

// Define button props using `VariantProps<typeof buttonVariants>`
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

export const ReactButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
    }
);
ReactButton.displayName = "Button";
