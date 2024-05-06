"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import { LuMoonStar } from "react-icons/lu";
import { FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant={"ghost"}
      className="rounded-full bg-muted p-3"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <LuMoonStar className="h-4 w-4 dark:hidden" />
      <FaSun className="hidden h-4 w-4 dark:block" />
    </Button>
  );
};

export default ThemeToggle;
