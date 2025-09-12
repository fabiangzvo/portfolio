import { useMemo } from "react";
import {
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link
} from "@heroui/react";

import { MenuItemProps } from "../../types";
import LanguageDropdown from "@components/languageDropdown";
import ThemeSwitch from "@components/themeSwitch";

type ListOfLinksProps = {
  isMenu: boolean;
  items: Array<MenuItemProps>;
};

function ListOfLinks(props: ListOfLinksProps) {
  const { isMenu, items } = props;

  const content = useMemo(
    () => {

      const menuItems = items.map(({ href, label }, key) => {
        const item = <Link href={href} className="w-full" color="foreground">{label}</Link>

        if (isMenu)
          return <NavbarMenuItem key={`menu-${key}`} className="gap-4">{item}</NavbarMenuItem>

        return <NavbarItem key={`navbar-${key}`} className="gap-4">{item}</NavbarItem>
      })

      if (isMenu) return (
        <NavbarMenu className="w-full items-center">
          {menuItems}
          <NavbarMenuItem className="grid grid-cols-2 place-items-center gap-4 relative">
            <LanguageDropdown />
            <ThemeSwitch />
          </NavbarMenuItem>
        </NavbarMenu>);

      return <NavbarContent justify="center" className="hidden md:flex gap-4">{menuItems}</NavbarContent>
    },
    [items, isMenu]
  );

  return content;
}

export default ListOfLinks;
