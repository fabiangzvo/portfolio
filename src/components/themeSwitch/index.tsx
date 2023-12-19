import { useTheme } from "next-themes";
import { FaMoon as Moon, FaSun as Sun } from "react-icons/fa";

import Button from "./components/button";

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex items-center border-primary border-[0.25rem] bg-primary rounded-full h-[3vh] w-[3vw] xl:h-[3vh] xl:w-[4vw] 2xl:w-[4vw] transition-all	transition ease-in-out xl:h-[3vh] xl:w-[3vw] max-lg:h-[40px] max-lg:w-[50px] max-xl:border-[2px]"
    >
      <Button
        classes={{
          container: theme === "light" ? "sm:flex" : "max-xl:hidden",
        }}
        Icon={Sun}
        isRight
        disable={theme === "light"}
      />
      <Button
        classes={{
          container: theme !== "light" ? "sm:flex" : "max-xl:hidden",
        }}
        Icon={Moon}
        disable={theme !== "light"}
      />
    </div>
  );
}

export default ThemeSwitch;
