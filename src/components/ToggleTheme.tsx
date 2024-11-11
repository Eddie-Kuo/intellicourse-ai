import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function ToggleTheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="sm"
      variant="ghost"
      className="justify-start"
    >
      <div className="flex gap-2 dark:hidden">
        <Moon className="size-5" />
      </div>

      <div className="hidden gap-2 dark:flex">
        <Sun className="size-5" />
      </div>
    </Button>
  );
}
