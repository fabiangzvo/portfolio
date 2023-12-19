import React from "react";
import NextLink from "next/link";

type LinkProps = {
  to: string;
  label: string | React.ReactNode;
};

function Link(props: LinkProps) {
  const { label, to } = props;

  return (
    <NextLink href={to}>
      <li className="flex justify-center max-lg:border-b-2 max-lg:border-tertiary max-lg:pb-3">
        {label}
      </li>
    </NextLink>
  );
}

export default Link;
