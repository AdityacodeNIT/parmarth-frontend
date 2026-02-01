import { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";

const themes = ["light", "dark"];

export default function ThemeToggle() {
  const [theme, setTheme] = useState("system");

  // Apply theme to <html>
  const applyTheme = (mode) => {
    const root = document.documentElement;

    root.classList.remove("dark");

    if (mode === "dark") {
      root.classList.add("dark");
    }

    if (mode === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) root.classList.add("dark");
    }
  };

  // Initial load
  useEffect(() => {
    const stored = localStorage.getItem("theme") || "system";
    setTheme(stored);
    applyTheme(stored);
  }, []);

  // Cycle theme
  const toggleTheme = () => {
    const next =
      themes[(themes.indexOf(theme) + 1) % themes.length];

    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  const Icon =
    theme === "light"
      ? Sun
      : theme === "dark"
      ? Moon
      : Laptop;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={`Theme: ${theme}`}
    >
      <Icon className="h-5 w-5" />
    </Button>
  );
}
