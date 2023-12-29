import React from "react";
import NextLink from "next/link";

import { MenuItemProps } from "../../types";

function Link(props: MenuItemProps) {
  const { label, href } = props;

  return (
    <NextLink href={href}>
      <li className="flex justify-center max-lg:border-b-2 max-lg:border-primary max-lg:py-3 max-lg:text-4xl">
        {label}
      </li>
    </NextLink>
  );
}

export default Link;
