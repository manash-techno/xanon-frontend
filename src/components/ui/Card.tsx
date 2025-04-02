import { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
    children: ReactNode;
    className?: string;
}

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

interface CardBodyProps {
    children: ReactNode;
    className?: string;
}

interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

export const Card = ({ children, className }: CardProps) => {
    return (
        <div className={clsx("rounded-lg shadow-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900", className)}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className }: CardHeaderProps) => {
    return (
        <div className={clsx("px-4 py-3 border-b border-gray-200 dark:border-gray-700", className)}>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{children}</h3>
        </div>
    );
};

export const CardBody = ({ children, className }: CardBodyProps) => {
    return (
        <div className={clsx("px-4 py-3 text-gray-700 dark:text-gray-300", className)}>
            {children}
        </div>
    );
};

export const CardFooter = ({ children, className }: CardFooterProps) => {
    return (
        <div className={clsx("px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2", className)}>
            {children}
        </div>
    );
};