import React from "react";
import { ButtonProps } from "./types";

function Button(props: ButtonProps) {
  const { label, onClick } = props;

  return (
    <button
      className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xl font-medium text-text rounded-lg group bg-gradient-to-br from-secondary to-primary group-hover:from-primary group-hover:to-secondary focus:ring-4 focus:outline-none focus:ring-primary"
      onClick={onClick}
    >
      <span className="relative text-text w-full px-5 py-2.5 transition-all ease-in duration-75 bg-background rounded-md group-hover:bg-transparent group-hover:text-buttonText">
        {label}
      </span>
    </button>
  );
}

export default Button;
