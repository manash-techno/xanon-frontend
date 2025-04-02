import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

/** Root DropdownMenu Component */
export const ReactDropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/** Dropdown Content Wrapper */
export const DropdownMenuContent = React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-gray-900 shadow-md",
                "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100",
                className
            )}
            {...props}
        />
    </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

/** Radio Group Wrapper */
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/** Dropdown Menu Radio Item */
export const DropdownMenuRadioItem = React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.RadioItem
        ref={ref}
        className={cn(
            "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none",
            "transition-all hover:bg-gray-100 dark:hover:bg-gray-700",
            className
        )}
        {...props}
    >
        {children}
    </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

/** Dropdown Menu Item */
export const DropdownMenuItem = React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
            "transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-800",
            "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            inset && "pl-8",
            className
        )}
        {...props}
    />
));
DropdownMenuItem.displayName = "DropdownMenuItem";
