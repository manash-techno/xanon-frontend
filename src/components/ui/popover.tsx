import { Popover as MuiPopover, PopoverProps } from "@mui/material";
import { FC, JSX, ReactNode } from "react";

/**
 * Props for the CustomPopover component.
 */
interface CustomPopoverProps extends Omit<PopoverProps, "children"> {
    /**
     * The content inside the popover.
     */
    children: ReactNode;
}

/**
 * CustomPopover component using Material-UI's Popover with Tailwind support.
 *
 * This component provides a reusable and customizable popover with Material-UI's
 * `Popover` functionality while integrating Tailwind CSS styles.
 *
 * @component
 * @example
 * ```tsx
 * <CustomPopover open={true} anchorEl={anchorRef} onClose={() => setOpen(false)}>
 *     <div className="p-4">Popover Content</div>
 * </CustomPopover>
 * ```
 *
 * @param {CustomPopoverProps} props - The component props.
 * @param {ReactNode} props.children - The content inside the popover.
 * @returns {JSX.Element} A Material-UI Popover component with Tailwind styling.
 */

const CustomPopover: FC<CustomPopoverProps> = ({ children, ...props }): JSX.Element => {
    return (
        <MuiPopover
            {...props} // Spread only valid props, children is explicitly passed separately
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            classes={{ paper: "shadow-lg rounded-lg bg-white" }} // Tailwind applied correctly
        >
            {children}
        </MuiPopover>
    );
};

export { CustomPopover as Popover };
