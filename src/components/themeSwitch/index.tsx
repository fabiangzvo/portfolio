import { useCallback } from "react";
import { useTheme } from "next-themes";

import { Classic } from "@theme-toggles/react"

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const handleClick = useCallback(
    () => setTheme(theme === "light" ? "dark" : "light"),
    [theme, setTheme]
  );

  return (
      <Classic
        className="flex justify-center items-center scale-[1.8]"
        toggled={theme === "light"}
        toggle={handleClick}
        duration={400}
      />
  );
}

export default ThemeSwitch;
