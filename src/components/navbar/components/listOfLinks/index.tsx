import { useMemo } from "react";
import cs from "classnames";

import Link from "../link";
import { MenuItemProps } from "../../types";

type ListOfLinksProps = {
  hide: boolean;
  items: Array<MenuItemProps>;
};

function ListOfLinks(props: ListOfLinksProps) {
  const { hide, items } = props;

  const links = useMemo(
    () => items.map((item, key) => <Link key={key} {...item} />),
    [items]
  );

  return (
    <div
      className={cs({
        "flex justify-around order-none w-[25vw] lg:w-[52vw] xl:w-[45vw] max-lg:w-full max-lg:order-3 max-lg:pb-3":
          true,
        hidden: hide,
      })}
      suppressHydrationWarning
    >
      <ul className="flex justify-around w-full max-lg:flex-col h-auto duration-300 transition-all">
        {links}
      </ul>
    </div>
  );
}

export default ListOfLinks;
