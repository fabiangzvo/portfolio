import { useState, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Link,
} from "@heroui/react";

import LanguageDropdown from "@components/languageDropdown";
import ThemeSwitch from "@components/themeSwitch";
import { useMediaQuery } from "@hooks/useMediaquery";
import items from "@shared/menuItems.json";

import ListOfLinks from "./components/listOfLinks";
import { MenuItemProps } from "./types";

type MenuType = Array<MenuItemProps>;

function NavbarComponent() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const isSm = useMediaQuery("(max-width: 1024px)");
  const translations = useTranslations("navbar");

  const menu = useMemo<MenuType>(
    () =>
      items.map((item) => ({
        label: translations(item.label),
        href: item.href,
      })),
    [translations]
  );

  return (
    <Navbar onMenuOpenChange={setShowMenu} classNames={{ wrapper: "max-w-full bg-background" }}>
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link
            href="/"
            className="block transition text-text whitespace-nowrap font-semibold focus:outline-none max-md:flex max-md:justify-center"
          >
            <h1 className="max-md:flex max-xl:justify-start max-md:w-full underlined cursor-pointer bg-clip-text fill-text-transparent bg-gradient-to-r to-tertiary from-primary">
              Fabián Guzmán Otavo
            </h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <ListOfLinks isMenu={isSm} items={menu} />
      <NavbarContent justify="end" className="max-lg:hidden">
        <NavbarItem>
          <LanguageDropdown />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenuToggle
        aria-label={showMenu ? "Close menu" : "Open menu"}
        className="lg:hidden"
      />
    </Navbar>);
}
export default NavbarComponent;
