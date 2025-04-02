import {createContext} from "react";

export type ThemeType = "light" | "dark" | "system";

interface ThemeContextProps {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

// Create Theme Context
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
