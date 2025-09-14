import React from "react";
import { InputProps } from "./types";

function Input(props: InputProps) {
  const { label, name, ...rest } = props;

  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block mb-2 text-base text-text"
      >
        {label}
      </label>
      <input
        id={name}
        className="bg-stroke text-base rounded-lg block w-full p-2.5"
        {...rest}
      />
    </div>
  );
}

export default Input;
