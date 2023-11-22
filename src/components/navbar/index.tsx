import { useState, useCallback } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import cs from "classnames";

import LanguageDropdown from "@components/languageDropdown";
import ThemeSwitch from "@components/themeSwitch";
import { useMediaQuery } from "@hooks/useMediaquery";

function Navbar() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const isSm = useMediaQuery("(max-width: 768px)");

  const handleClick = useCallback(() => setShowMenu(!showMenu), [showMenu]);

  return (
    <nav className="w-full flex justify-between py-4 text-xl max-md:flex-col max-md:justify-center ">
      <div className="flex justify-center align-middle gap-4 max-md:order-1 max-md:w-full order-none max-md:justify-around">
        <Link
          href="/"
          className="block transition text-primary whitespace-nowrap font-medium focus:outline-none max-md:flex max-md:justify-center max-md:w-full"
        >
          <h1 className="max-md:flex max-md:justify-start max-md:w-full underlined cursor-pointer">
            Fabián Guzmán Otavo
          </h1>
          <button
            onClick={handleClick}
            className="md:hidden max-md:flex max-md:justify-end max-md:block "
          >
            <GiHamburgerMenu />
          </button>
        </Link>
      </div>
      <div
        className={cs({
          "flex w-[15vw] justify-around order-none max-md:w-full max-md:order-3 max-md:pb-3":
            true,
          hidden: !showMenu && isSm,
        })}
      >
        <ul className="flex justify-around w-full max-md:flex-col h-auto duration-300 transition-all">
          <li className="flex justify-center max-md:border-b-2 max-md:border-tertiary max-md:pb-3">
            Service
          </li>
          <li className="flex justify-center max-md:border-b-2 max-md:border-tertiary max-md:pb-3">
            Portfolio
          </li>
          <li className="flex justify-center max-md:border-b-2 max-md:border-tertiary max-md:pb-3">
            About
          </li>
          <li className="flex justify-center max-md:border-b-2 max-md:border-tertiary max-md:pb-3">
            contact
          </li>
        </ul>
      </div>
      <div
        className={cs({
          "flex w-[15vw] justify-around flex max-md:w-full justify-center max-md:order-1 order-none	max-md:order-5":
            true,
          hidden: !showMenu && isSm,
        })}
      >
        <LanguageDropdown />
        <ThemeSwitch />
      </div>
    </nav>
  );
}

export default Navbar;
