import React from "react";

import { OptionProps } from "../../types";

function Option(props: OptionProps) {
  const { handleClick, label, value } = props;

  return (
    <li value={value} onClick={handleClick}>
      <span
        className="cursor-pointer block px-4 py-2 hover:bg-stroke max-lg:text-3xl"
        data-value={value}
      >
        {label}
      </span>
    </li>
  );
}

export default Option;
