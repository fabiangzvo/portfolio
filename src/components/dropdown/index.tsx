"use client";
import { useCallback, useState } from "react";

import Chevron from "@components/icons/chevron";

import { DropdownProps } from "./types";
import ListOfOptions from "./components/optionList";

function Dropdown(props: DropdownProps) {
  const { label, options, handleClick, id = "dropdown" } = props;
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
        id={id}
        data-dropdown-toggle="dropdown"
        className="l-3 min-w-48 border-2 border-primary self-center rounded-xl text-text bg-transparent font-medium text-sm px-5 py-2.5 inline-flex items-center justify-around max-lg:w-25 max-lg:text-3xl"
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
        hideOptions={handleShowOptions}
      />
    </>
  );
}

export default Dropdown;
