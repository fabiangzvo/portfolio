import { useTheme } from "next-themes";
import { FaMoon as Moon, FaSun as Sun } from "react-icons/fa";

import Button from "./components/button";

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex items-center border-secondary border-[0.25rem] bg-secondary rounded-full h-[3vh] w-[3vw] transition-all	transition ease-in-out max-sm:h-[50px] max-sm:w-[50px] max-sm:border-[2px]"
    >
      <Button
        classes={{
          container: theme === "light" ? "sm:flex" : "max-sm:hidden",
        }}
        Icon={Sun}
        isRight
        disable={theme === "light"}
      />
      <Button
        classes={{
          container: theme !== "light" ? "sm:flex" : "max-sm:hidden",
        }}
        Icon={Moon}
        disable={theme !== "light"}
      />
    </div>
  );
}

export default ThemeSwitch;
