"use client";
import { useCallback, useState } from "react";
import cs from "classnames";

type DropdownProps = {
  label: string | React.ReactElement;
  options: Array<{ label: string; value: string }>;
  handleClick: React.MouseEventHandler<HTMLElement>;
};

function Dropdown(props: DropdownProps) {
  const { label, options, handleClick } = props;
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleShowOptions = useCallback(() => {
    setShowOptions(!showOptions);
  }, [showOptions]);

  const onClick = useCallback<React.MouseEventHandler<HTMLElement>>(
    (event) => {
      handleClick(event);

      setShowOptions(false);
    },
    [handleClick]
  );

  return (
    <>
      <button
        id="dropdown"
        data-dropdown-toggle="dropdown"
        className="l-3 w-48 border border-secondary rounded-xl text-text bg-transparent font-medium text-sm px-5 py-2.5  inline-flex items-center justify-around"
        type="button"
        onClick={handleShowOptions}
      >
        {label}
        <svg
          className="w-2.5 h-2.5 ms-3 transition ease-in-out"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox={showOptions ? "0 0 14 8" : "0 0 10 6"}
        >
          <path
            className="transition ease-in-out"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={
              showOptions
                ? "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
                : "m1 1 4 4 4-4"
            }
          />
        </svg>
      </button>
      <div
        id="dropdown"
        className={cs({
          "z-10 bg-background divide-y divide-gray-100 rounded-lg shadow w-44 absolute":
            true,
          hidden: !showOptions,
        })}
      >
        <ul
          className="py-2 text-sm text-text"
          aria-labelledby="dropdownDefaultButton"
        >
          {options.map((language) => (
            <li key={language.value} value={language.value} onClick={onClick}>
              <a
                className="cursor-pointer block px-4 py-2 hover:bg-tertiary"
                data-value={language.value}
              >
                {language.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Dropdown;
