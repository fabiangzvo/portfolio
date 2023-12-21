import { ReactNode, useCallback } from "react";

interface ScrollButton {
  scrollTo: "up" | "down";
  label: string | ReactNode;
  callback?: () => void;
}

function ScrollButton(props: ScrollButton) {
  const { scrollTo, callback, label } = props;

  const handleClick = useCallback(() => {
    const value = scrollTo === "down" ? document.body.scrollHeight : 0;

    window.scrollTo(0, value);

    callback && callback();
  }, [scrollTo, callback]);

  return (
    <button
      onClick={handleClick}
      type="button"
      className="text-text font-extrabold text-center"
    >
      {label}
    </button>
  );
}

export default ScrollButton;
