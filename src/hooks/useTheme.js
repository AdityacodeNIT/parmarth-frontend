import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const stored = localStorage.getItem("theme") || "system";
    setTheme(stored);
    applyTheme(stored);
  }, []);

  const applyTheme = (mode) => {
    const root = document.documentElement;
    root.classList.remove("dark");

    if (mode === "dark") {
      root.classList.add("dark");
    } else if (mode === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) root.classList.add("dark");
    }
  };

  const updateTheme = (value) => {
    setTheme(value);
    localStorage.setItem("theme", value);
    applyTheme(value);
  };

  return { theme, setTheme: updateTheme };
}
