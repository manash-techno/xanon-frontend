import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import {AssetsConfig} from "@/config/assetsConfig.ts";
import {pagePaths} from "@/config/pagePaths.ts";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="relative h-screen flex flex-col justify-center items-center bg-cover bg-center bg-gray-100 dark:bg-gray-900
        text-gray-900 dark:text-gray-100 "
             style={{ backgroundImage: `url(${AssetsConfig.images.backgroundAuth.src})` }}
        >
            {/* Header: Logo & Theme Switcher */}
            <div className="absolute top-4 left-4 z-10">
                <Link to={pagePaths.home}>
                    <img
                        src={AssetsConfig.images.branding.logoSingle.src}
                        width={60}
                        height={60}
                        alt={AssetsConfig.images.branding.logoSingle.alt}
                    />
                </Link>
            </div>
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
