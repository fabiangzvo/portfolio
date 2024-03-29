import Image from "next/image";
import cs from "classnames";
import { useTranslations } from "next-intl";

import Badge from "@components/badge";

import { CardProps } from "../types";

function Card(props: CardProps) {
  const { title, description, link, imageUrl, isWork } = props;
  const translations = useTranslations("portfolio");

  return (
    <div className="max-w-sm bg-background border border-stroke rounded-lg shadow-md shadow-stroke max-h-xl hover:shadow-stroke hover:shadow-xl transition-all z-10 max-md:max-w-lg">
      <Image
        className="rounded-t-lg h-[15vh] max-md:h-[35vh] max-md:w-full"
        src={imageUrl}
        alt={title}
        width={390}
        height={300}
      />
      <div className="p-5 min-h-[25vh] flex flex-col justify-between max-md:h-[70vh]">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-text max-md:text-4xl">
          {title}&nbsp;
          {isWork && <Badge label={translations("work")} />}
        </h2>
        <div className="group flex flex-wrap cursor-default">
          <p
            data-tooltip-target="tooltip-default"
            className="mb-3 text-xl text-paragraph line-clamp-6 max-md:text-4xl md:line-clamp-4"
            data-tooltip-placement="top"
          >
            {description}
          </p>
          <div
            id="tooltip-default"
            data-tooltip-placement="top"
            role="tooltip"
            className="absolute z-20 invisible max-w-sm inline-block px-3 py-2 text-sm font-medium text-text transition-opacity duration-300 bg-background border border-stroke rounded-lg shadow-sm opacity-0 -translate-y-20 tooltip group-hover:opacity-100 group-hover:visible max-md:text-3xl max-md:max-w-lg"
          >
            {description}
          </div>
        </div>
        <div
          className={cs({
            "opacity-0 pointer-events-none": !link,
          })}
        >
          {link && (
            <button className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xl font-medium text-text rounded-lg group bg-gradient-to-br from-secondary to-primary group-hover:from-primary group-hover:to-secondary focus:ring-4 focus:outline-none focus:ring-primary">
              <a
                className="relative text-text w-full px-5 py-2.5 transition-all ease-in duration-75 bg-background rounded-md group-hover:bg-transparent group-hover:text-buttonText max-md:text-4xl"
                target="_blank"
                href={link}
              >
                {translations("visit")}
              </a>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
