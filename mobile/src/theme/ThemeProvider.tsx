import React, { createContext, useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";

type ThemeType = "light" | "dark" | "system";

type ThemeContextType = {
  theme: ThemeType;
  isDarkMode: boolean;
  setTheme: (theme: ThemeType) => void;
  colors: typeof lightColors;
};

const lightColors = {
  background: "#FFFFFF",
  card: "#FFFFFF",
  text: "#000000",
  border: "#E5E5E5",
  primary: "#000000",
  primaryForeground: "#FFFFFF",
  secondary: "#F5F5F5",
  secondaryForeground: "#000000",
  muted: "#F5F5F5",
  mutedForeground: "#737373",
  accent: "#F5F5F5",
  accentForeground: "#000000",
  destructive: "#EF4444",
  destructiveForeground: "#FFFFFF",
};

const darkColors = {
  background: "#121212",
  card: "#1E1E1E",
  text: "#FFFFFF",
  border: "#2A2A2A",
  primary: "#FFFFFF",
  primaryForeground: "#000000",
  secondary: "#2A2A2A",
  secondaryForeground: "#FFFFFF",
  muted: "#2A2A2A",
  mutedForeground: "#A3A3A3",
  accent: "#2A2A2A",
  accentForeground: "#FFFFFF",
  destructive: "#7F1D1D",
  destructiveForeground: "#FFFFFF",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>("system");
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  useEffect(() => {
    if (theme === "system") {
      setIsDarkMode(colorScheme === "dark");
    } else {
      setIsDarkMode(theme === "dark");
    }
  }, [theme, colorScheme]);

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
