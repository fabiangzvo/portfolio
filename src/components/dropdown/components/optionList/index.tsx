import { useMemo } from "react";
import cs from "classnames";

import Option from "../option";
import { OptionListProps } from "../../types";

function OptionList(props: OptionListProps) {
  const { isOpen, options, handleClick } = props;

  const optionList = useMemo(
    () =>
      options.map(({ label, value }, key) => (
        <Option
          key={key}
          label={label}
          value={value}
          handleClick={handleClick}
        />
      )),
    [handleClick, options]
  );

  return (
    <div
      id="dropdown"
      className={cs({
        "z-10 bg-background divide-y divide-gray-100 rounded-lg shadow w-44 absolute":
          true,
        hidden: !isOpen,
      })}
    >
      <ul
        className="py-2 text-sm text-text"
        aria-labelledby="dropdownDefaultButton"
      >
        {optionList}
      </ul>
    </div>
  );
}

export default OptionList;
