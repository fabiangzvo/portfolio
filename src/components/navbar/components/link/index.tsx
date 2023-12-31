import React from "react";
import NextLink from "next/link";

import { MenuItemProps } from "../../types";

function Link(props: MenuItemProps) {
  const { label, href } = props;

  return (
    <li>
      <NextLink
        className="flex justify-center max-lg:border-b-2 max-lg:border-primary max-lg:py-3 max-lg:text-4xl"
        href={href}
      >
        {label}
      </NextLink>
    </li>
  );
}

export default Link;
