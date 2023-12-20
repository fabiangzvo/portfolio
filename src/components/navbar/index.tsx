import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import cs from "classnames";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

import LanguageDropdown from "@components/languageDropdown";
import ThemeSwitch from "@components/themeSwitch";
import { useMediaQuery } from "@hooks/useMediaquery";

import ListOfLinks from "./components/listOfLinks";

function Navbar() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const isSm = useMediaQuery("(max-width: 1024px)");
  const translations = useTranslations("navbar");

  const handleClick = useCallback(() => setShowMenu(!showMenu), [showMenu]);

  const menu = useMemo<Array<{ label: string; to: string }>>(
    () => [
      {
        label: translations("about"),
        to: "#about",
      },
      {
        label: translations("education"),
        to: "#education",
      },
      {
        label: translations("experience"),
        to: "#experience",
      },
      {
        label: translations("portfolio"),
        to: "#portfolio",
      },
      {
        label: translations("contact"),
        to: "#contact",
      },
    ],
    [translations]
  );

  return (
    <nav className="w-full z-[2000] font-albertSans bg-background fixed flex justify-around py-4 text-xl start-0 max-lg:flex-col max-lg:justify-center max-lg:px-5">
      <div className="flex justify-center align-middle gap-4 max-lg:order-1 order-none max-xl:justify-between">
        <Link
          href="/"
          className="block transition text-text whitespace-nowrap font-medium focus:outline-none max-lg:flex max-lg:justify-center"
        >
          <h1 className="max-lg:flex max-xl:justify-start max-lg:w-full underlined cursor-pointer bg-clip-text fill-text-transparent bg-gradient-to-r to-tertiary from-primary max-lg:text-4xl">
            Fabián Guzmán Otavo
          </h1>
        </Link>
        <button
          onClick={handleClick}
          className="text-3xl lg:hidden max-lg:flex max-xl:justify-end max-sm:text-5xl"
        >
          <GiHamburgerMenu />
        </button>
      </div>
      <ListOfLinks hide={!showMenu && isSm} items={menu} />
      <div
        className={cs({
          "flex w-[230px] justify-between max-lg:w-full order-none max-lg:order-5":
            true,
          hidden: !showMenu && isSm,
        })}
        suppressHydrationWarning
      >
        <LanguageDropdown />
        <ThemeSwitch />
      </div>
    </nav>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../translations/${locale}.json`)).default,
    },
  };
}

export default Navbar;
