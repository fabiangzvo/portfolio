import React, { useRef, useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import cs from "classnames";
import { twMerge } from "tailwind-merge";
import { Button } from "@heroui/react";

import { MilestoneItemProps } from "../types";

function MilestoneItem(props: MilestoneItemProps) {
  const { primaryText, secondaryText, description, icon, disableViewMore, iconClass = '' } =
    props;
  const [isHide, setIsHide] = useState(true);

  const ref = useRef<HTMLParagraphElement | null>(null);
  const translations = useTranslations("main");

  const handleClick = useCallback(() => {
    if (ref?.current) {
      const target = ref?.current;
      const isHideStatus = target.classList.contains("line-clamp-2");

      isHideStatus
        ? target.classList.remove("line-clamp-2")
        : target.classList.add("line-clamp-2");

      setIsHide(!isHideStatus);
    }
  }, [ref]);

  return (
    <li className="ms-4 h-full">
      <div className="flex items-end">
        <div className={cs({ "absolute -start-6 flex justify-center": true, [iconClass]: !!iconClass })}>{icon}</div>
        <h2 className="text-xl font-semibold text-text pointer-events-none pl-2">
          {secondaryText}
        </h2>
      </div>
      <div className={twMerge("relative border-s-2 border-primary pl-4 -start-5 mb-6", disableViewMore && "mb-4 h-min")}>
        <time className="pointer-events-none text-base font-normal leading-none text-gray-400 dark:text-gray-500">
          {primaryText}
        </time>
        <p
          ref={ref}
          className="text-base font-normal text-paragraph line-clamp-2 pointer-events-none"
        >
          {description}
        </p>
        {!disableViewMore && <Button
          className="font-extrabold text-base data-[hover=true]:bg-transparent data-[hover=true]:text-primary"
          onPress={handleClick}
          variant="light"
          color="default"
        >
          {translations(isHide ? "viewMore" : "viewLess")}
        </Button>}
      </div>
    </li>
  );
}

export default MilestoneItem;
