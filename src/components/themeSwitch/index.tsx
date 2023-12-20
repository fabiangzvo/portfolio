import { useCallback } from "react";
import { useTheme } from "next-themes";
import { FaMoon as Moon, FaSun as Sun } from "react-icons/fa";

import Button from "./components/button";

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const handleClick = useCallback<React.MouseEventHandler<HTMLElement>>(
    () => setTheme(theme === "light" ? "dark" : "light"),
    [theme, setTheme]
  );

  return (
    <div
      onClick={handleClick}
      className="flex items-center border-primary border-2 bg-primary rounded-full h-10 w-10 max-lg:h-16 max-lg:w-16"
    >
      <Button
        classes={{ container: "h-9 w-9 max-lg:h-[3.8rem] max-lg:w-[3.8rem]" }}
        Icon={theme === "light" ? Sun : Moon}
      />
    </div>
  );
}

export default ThemeSwitch;
