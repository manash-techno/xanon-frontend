import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/contexts/ThemeContext.tsx";

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    const { theme, setTheme } = context;
    const [appliedTheme, setAppliedTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const updateAppliedTheme = () => {
            if (theme === "system") {
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                setAppliedTheme(prefersDark ? "dark" : "light");
            } else {
                setAppliedTheme(theme);
            }
        };

        updateAppliedTheme();

        if (theme === "system") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            mediaQuery.addEventListener("change", updateAppliedTheme);
            return () => mediaQuery.removeEventListener("change", updateAppliedTheme);
        }
    }, [theme]);

    return { theme, setTheme, appliedTheme };
};
