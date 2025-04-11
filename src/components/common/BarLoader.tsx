import { JSX } from "react";

interface iBarLoaderProps {
    color?: string;
}

export const BarLoader: ({color}: iBarLoaderProps) => JSX.Element = ({ color = "#0077E5" }) => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div
                className="relative w-[90%] h-[6px] overflow-hidden rounded-full bg-gradient-to-r shadow-md"
                style={{ background: color }}
            >
                <div
                    className="absolute left-0 h-full w-[35%] rounded-full animate-bar-loader opacity-90 dark:opacity-95 shadow-lg"
                    style={{ background: color === "#0077E5" ? "white" : color }}
                ></div>
            </div>
        </div>
    );
};
