"use client";

import { useEffect, useRef, useState, type WheelEvent } from "react";
import { twMerge } from "tailwind-merge";
import { FaLaptopCode } from "react-icons/fa";

import type { HorizontalTimelineItemProps } from "../../types";

function TimelineItem(props: HorizontalTimelineItemProps) {
  const {
    icon,
    iconClass = "",
    primaryText,
    secondaryText,
    description,
    index,
    className,
  } = props;
  const descRef = useRef<HTMLParagraphElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = descRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setHasOverflow(el.scrollHeight > el.clientHeight + 1);
    };

    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);
    return () => observer.disconnect();
  }, [description]);

  const handleWheel = (event: WheelEvent<HTMLParagraphElement>) => {
    if (!hasOverflow) return;
    const el = event.currentTarget;
    const atTop = el.scrollTop <= 0 && event.deltaY < 0;
    const atBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 1 && event.deltaY > 0;
    if (!atTop && !atBottom) {
      event.stopPropagation();
    }
  };

  return (
    <li
      data-hx-card
      className={twMerge(
        "relative w-[90vw] md:w-[min(560px,86vw)] h-[min(460px,calc(100dvh-13rem))] flex flex-col flex-none snap-center rounded-3xl border border-stroke bg-background p-6 md:p-10 shadow-md font-albertSans",
        className,
      )}>
      {/* Highlight while the card sits in the centre of the screen (animated by the hook) */}
      <span
        data-hx-glow
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-3xl border-2 border-primary opacity-0"
      />

      {/* Dot on the line, built from the item's icon */}
      <span
        data-hx-dot
        aria-hidden="true"
        className="absolute -top-[88px] max-md:-top-[72px] left-7 max-md:left-6 flex h-16 w-16 max-md:h-[52px] max-md:w-[52px] items-center justify-center rounded-full border-2 border-stroke bg-background ring-4 ring-background">
        <span
          data-hx-on
          className="absolute -inset-0.5 rounded-full border-2 border-primary"
        />
        <span
          data-hx-icon
          className={twMerge(
            "relative flex items-center justify-center text-primary [&_svg]:h-8 [&_svg]:w-8 max-md:[&_svg]:h-6 max-md:[&_svg]:w-6",
            iconClass,
          )}>
          {icon}
        </span>
      </span>

      <span
        data-hx-num
        aria-hidden="true"
        className="pointer-events-none absolute right-6 md:right-7 top-5 md:top-6 font-extrabold leading-none text-primary opacity-40">
        <FaLaptopCode size={40} />
      </span>

      <span className="block pr-16 md:pr-24 text-sm sm:text-base md:text-lg font-semibold text-highlight shrink-0">
        {primaryText}
      </span>
      <h3 className="mb-3 mt-1.5 pr-16 md:pr-24 text-xl md:text-3xl font-bold leading-snug text-text shrink-0">
        {secondaryText}
      </h3>
      <p
        ref={descRef}
        onWheel={handleWheel}
        data-lenis-prevent-touch={hasOverflow ? "" : undefined}
        className={twMerge(
          "flex-1 min-h-0 text-base md:text-xl leading-relaxed text-paragraph",
          hasOverflow
            ? "overflow-y-auto overscroll-contain pr-2"
            : "overflow-y-hidden",
        )}>
        {description}
      </p>
    </li>
  );
}

export default TimelineItem;
