import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ReactNode } from "react";
import {AssetsConfig} from "@/config/assetsConfig.ts";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="relative h-screen flex flex-col justify-center items-center bg-cover bg-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 before:absolute before:inset-0 before:bg-black/30 dark:before:bg-black/70 before:backdrop-blur before:z-0"
             style={{ backgroundImage: `url(${AssetsConfig.images.backgroundAuth.src})` }}
        >
            <div className="absolute top-4 right-4 z-10">
                <ThemeSwitcher />
            </div>

            {/* Auth Form (Login, Register, Forgot Password) */}
            <div className="relative z-10 flex flex-col items-center">
                {children}
            </div>
        </div>
    );
};
