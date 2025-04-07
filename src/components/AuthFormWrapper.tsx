import {FormHTMLAttributes, JSX, memo, ReactNode} from "react";
import {cn} from "@/lib/utils.ts";

type AuthFormWrapperProps = {
    children: ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

const AuthFormWrapperComponent = ({
                                    children,
                                    className,
                                    ...rest
                                }: AuthFormWrapperProps): JSX.Element => {
    return (
        <form
            className={cn(
                "p-8 rounded-2xl w-96 flex flex-col gap-6",
                "bg-white text-gray-900 shadow-md",
                "dark:bg-[#242424] dark:text-gray-100 dark:shadow-lg",
                className
            )}
            {...rest}
        >{children}</form>
    );
};
export const AuthFormWrapper = memo(AuthFormWrapperComponent);