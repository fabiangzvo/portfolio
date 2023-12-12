import React, { useRef, useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";

type MilestoneItemProps = {
  icon: React.ReactNode;
  description: string;
  primaryText: string | React.ReactNode;
  secondaryText: string;
};

function MilestoneItem(props: MilestoneItemProps) {
  const { primaryText, secondaryText, description, icon } = props;
  const [isHide, setIsHide] = useState(true);

  const ref = useRef<HTMLParagraphElement | null>(null);
  const translations = useTranslations("main");

  const handleClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (ref?.current) {
      const target = ref?.current;
      const isHideStatus = target.classList.contains("line-clamp-1");

      isHideStatus
        ? target.classList.remove("line-clamp-1")
        : target.classList.add("line-clamp-1");

      setIsHide(!isHideStatus);
    }
  }, [ref]);

  return (
    <li className="mb-6 ms-4 h-full">
      <div className="flex items-end">
        <div className="absolute -start-6 flex justify-center">{icon}</div>
        <time className="text-lg font-normal leading-none text-gray-400 dark:text-gray-500 pl-2">
          {primaryText}
        </time>
      </div>
      <div className="relative border-s-2 border-primary mt-3 pl-4 -start-5 ">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {secondaryText}
        </h3>
        <p
          ref={ref}
          className="text-xl font-normal text-gray-500 dark:text-gray-400 line-clamp-1"
        >
          {description}
        </p>
        <button onClick={handleClick}>
          {translations(isHide ? "viewMore" : "viewLess")}
        </button>
      </div>
    </li>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../translations/${locale}.json`))
        .default,
    },
  };
}

export default MilestoneItem;
