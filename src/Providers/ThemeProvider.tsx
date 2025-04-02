import {ReactNode, useEffect, useState} from "react";
import { ThemeType, ThemeContext } from "@/contexts/ThemeContext.tsx";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<ThemeType>("system");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as ThemeType | null;
        applyTheme(savedTheme || "system");
    }, []);

    const applyTheme = (newTheme: ThemeType) => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.classList.toggle("dark", prefersDark);
        } else {
            document.documentElement.classList.toggle("dark", newTheme === "dark");
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: applyTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
