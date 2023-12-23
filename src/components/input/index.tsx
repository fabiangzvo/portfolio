import React from "react";
import { InputProps } from "./types";

function Input(props: InputProps) {
  const { label, name, ...rest } = props;

  return (
    <div className="mb-10">
      <label
        htmlFor={name}
        className="block mb-2 text-xl text-text max-md:text-4xl"
      >
        {label}
      </label>
      <input
        id={name}
        className="bg-stroke text-lg rounded-lg block w-full p-2.5 max-md:text-4xl"
        {...rest}
      />
    </div>
  );
}

export default Input;
