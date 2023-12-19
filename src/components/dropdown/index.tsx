"use client";
import { useCallback, useState } from "react";

import Chevron from "@components/icons/chevron";

import { DropdownProps } from "./types";
import ListOfOptions from "./components/optionList";

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
        className="l-3 w-48 max-lg:w-25 border border-primary rounded-xl text-text bg-transparent font-medium text-sm px-5 py-2.5  inline-flex items-center justify-around"
        type="button"
        onClick={handleShowOptions}
      >
        {label}
        <Chevron isOpen={showOptions} />
      </button>
      <ListOfOptions
        handleClick={onClick}
        options={options}
        isOpen={showOptions}
      />
    </>
  );
}

export default Dropdown;
