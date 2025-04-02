import { ReactButton } from "@/components/ui/ReactButton.tsx";
import {
    ReactDropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/ReactDropdownMenu.tsx";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme.tsx";
import { ThemeType } from "@/contexts/ThemeContext.tsx";
import { useEffect } from "react";

const ICON_SIZE = 16;

interface ThemeSwitcherProps {
    className?: string;
    dropdownClassName?: string;
}

export const ThemeSwitcher = ({
                                  className = "",
                                  dropdownClassName = "",
                              }: ThemeSwitcherProps) => {
    const { theme, setTheme } = useTheme();

    // Syncs theme with the system when "system" mode is selected
    useEffect(() => {
        const updateTheme = () => {
            if (theme === "system") {
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                document.documentElement.classList.toggle("dark", prefersDark);
            } else {
                document.documentElement.classList.toggle("dark", theme === "dark");
            }
        };

        updateTheme();

        if (theme === "system") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            mediaQuery.addEventListener("change", updateTheme);
            return () => mediaQuery.removeEventListener("change", updateTheme);
        }
    }, [theme]);

    return (
        <ReactDropdownMenu>
            <DropdownMenuTrigger asChild>
                <ReactButton
                    variant="ghost"
                    size="sm"
                    className={`px-2 md:px-4 bg-gray-100 text-gray-900 border border-gray-300
                               dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 ${className}`}
                >
                    {theme === "light" ? (
                        <Sun size={ICON_SIZE} className="text-gray-700 dark:text-gray-200" />
                    ) : theme === "dark" ? (
                        <Moon size={ICON_SIZE} className="text-gray-700 dark:text-gray-200" />
                    ) : (
                        <Laptop size={ICON_SIZE} className="text-gray-700 dark:text-gray-200" />
                    )}
                </ReactButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="start"
                className={`theme-change-dropdown bg-white text-gray-900 border border-gray-300
                           dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 ${dropdownClassName}`}
            >
                <DropdownMenuRadioGroup value={theme} onValueChange={(newTheme) => setTheme(newTheme as ThemeType)}>
                    <DropdownMenuRadioItem
                        value="light"
                        className="flex gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <Sun size={ICON_SIZE} className="text-gray-700 dark:text-gray-200" />
                        <span>Light</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        value="dark"
                        className="flex gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <Moon size={ICON_SIZE} className="text-gray-700 dark:text-gray-200" />
                        <span>Dark</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        value="system"
                        className="flex gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <Laptop size={ICON_SIZE} className="text-gray-700 dark:text-gray-200" />
                        <span>System</span>
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </ReactDropdownMenu>
    );
};
