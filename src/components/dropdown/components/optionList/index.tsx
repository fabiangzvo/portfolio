import { useMemo, useRef, useEffect } from "react";
import cs from "classnames";

import Option from "../option";
import { OptionListProps } from "../../types";

function OptionList(props: OptionListProps) {
  const { isOpen, options, handleClick, hideOptions } = props;

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && divRef.current && !divRef.current.contains(event.target as Node))
        hideOptions();
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hideOptions, isOpen]);

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
      ref={divRef}
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
