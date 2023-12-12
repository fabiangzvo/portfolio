import Image from "next/image";
import cs from "classnames";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

import { CardProps } from "../types";

function Card(props: CardProps) {
  const { title, description, link, imageUrl, isWork } = props;
  const translations = useTranslations("portfolio");

  return (
    <div className="max-w-sm bg-background border border-secondary rounded-lg hover:shadow max-h-xl hover:shadow-primary hover:shadow-xl transition-all z-10">
      <Image
        className="rounded-t-lg h-[15vh]"
        src={imageUrl}
        alt={title}
        width={390}
        height={300}
      />
      <div className="p-5 h-[25vh] flex flex-col justify-between">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-text">
          {title}&nbsp;
          {isWork && (
            <span className="bg-primary text-secondary text-sm font-medium me-2 px-2.5 py-0.5 rounded">
              {translations("work")}
            </span>
          )}
        </h5>
        <div className="group flex flex-wrap cursor-default">
          <p
            data-tooltip-target="tooltip-default"
            className="mb-3 text-xl text-text line-clamp-6"
            data-tooltip-placement="top"
          >
            {description}
          </p>
          <div
            id="tooltip-default"
            data-tooltip-placement="top"
            role="tooltip"
            className="absolute z-20 invisible max-w-sm inline-block px-3 py-2 text-sm font-medium text-text transition-opacity duration-300 bg-tertiary rounded-lg shadow-sm opacity-0 -translate-y-20 tooltip group-hover:opacity-100 group-hover:visible"
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
                className="relative text-text w-full px-5 py-2.5 transition-all ease-in duration-75 bg-background rounded-md group-hover:bg-transparent"
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

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../translations/${locale}.json`))
        .default,
    },
  };
}

export default Card;
