import Image from "next/image";
import cs from "classnames";
import { useTranslations } from "next-intl";
import { Button, Card, CardBody, CardFooter, CardHeader, Tooltip } from "@heroui/react";

import Badge from "@components/badge";

import { CardProps } from "../types";

function CardComponent(props: CardProps) {
  const { title, description, link, imageUrl, isWork } = props;
  const translations = useTranslations("portfolio");

  return (
    <Card>
      <CardHeader className="p-0 relative h-[25vh]">
        <Image
          className="rounded-t-lg max-md:w-full inset-0 object-cover"
          src={imageUrl}
          alt={title}
          objectPosition="50% 20%"
          fill
        />
      </CardHeader>
      <CardBody>
        <h2 className="mb-2 text-xl font-bold tracking-tight text-text">
          {title}&nbsp;
          {isWork && <Badge label={translations("work")} />}
        </h2>
        <Tooltip color="default" content={<p className="w-[25vw]">{description}</p>}>
          <p className="text-base text-paragraph line-clamp-3">
            {description}
          </p>
        </Tooltip>
      </CardBody>
      <CardFooter className={cs({
        "opacity-0 pointer-events-none": !link,
      })}
      >
        {link && (
          <Button className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xl font-medium text-text rounded-lg group bg-gradient-to-br from-secondary to-primary group-hover:from-primary group-hover:to-secondary focus:ring-4 focus:outline-none focus:ring-primary">
            <a
              className="relative text-text w-full px-5 py-1 transition-all ease-in duration-75 bg-background rounded-md group-hover:bg-transparent group-hover:text-buttonText"
              target="_blank"
              href={link}
            >
              {translations("visit")}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default CardComponent;
