"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // localStorage kullanmadan önce tarayıcı ortamında olduğumuzdan emin olmalıyız
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // İlk render sonrası localStorage'dan tema tercihini al
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // Sistem tercihi dark ise dark tema kullan
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    // HTML elementine data-theme attribute'u ekle
    document.documentElement.setAttribute("data-theme", theme);
    // Kullanıcı tercihini localStorage'a kaydet
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
