import React, { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { ToastProps } from "./types";

function Toast(props: ToastProps) {
  const { content, icon, reset, timing = 500 } = props;

  useEffect(() => {
    const timeoutRef = setTimeout(() => reset(), timing);

    return () => clearTimeout(timeoutRef);
  }, [timing, reset]);

  return (
    <div
      id="toast-bottom-right"
      className="fixed z-20 inline-flex items-center w-full max-w-lg py-4 px-6 rounded-lg shadow right-5 bottom-5 bg-stroke opacity-100 transition-opacity duration-1000"
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8">
        {icon}
      </div>
      <div className="ms-3 text-base font-normal">{content}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-9 w-9 hover:bg-background dark:hover:bg-black-200"
        data-dismiss-target="#toast-default"
        aria-label="Close"
        onClick={reset}
      >
        <MdOutlineClose className="text-text text-xl" />
      </button>
    </div>
  );
}

export default Toast;
