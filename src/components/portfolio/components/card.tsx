import { useMemo } from "react";
import { Card, CardFooter, Image, useDisclosure, Tooltip } from "@heroui/react";

import { CardProps } from "../types";
import { STACK_LIST } from "../constants";
import DetailModal from "./detailModal";

function CardComponent(props: CardProps) {
  const { title, description, imageUrl, stackList, link, index = 0 } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const stack = useMemo(
    () =>
      stackList.map((tech: string) => {
        const Icon = STACK_LIST[tech as keyof typeof STACK_LIST];

        return (
          <Tooltip key={tech} content={tech}>
            <div className="bg-primary rounded-full p-1">
              <Icon size={30} />
            </div>
          </Tooltip>
        );
      }),
    [stackList],
  );

  const footerIcons = useMemo(
    () =>
      stackList.map((tech: string) => {
        const Icon = STACK_LIST[tech as keyof typeof STACK_LIST];
        return (
          <span
            key={tech}
            title={tech}
            className="bg-primary text-background rounded-full p-1.5 flex items-center justify-center">
            <Icon size={18} />
          </span>
        );
      }),
    [stackList],
  );

  return (
    <li
      data-hx-card
      className="relative w-[90vw] md:w-[min(520px,86vw)] flex-none snap-center font-albertSans">
      {/* Highlight while the card sits in the centre of the screen (animated by the hook) */}
      <span
        data-hx-glow
        aria-hidden="true"
        className="pointer-events-none absolute -inset-0.5 z-20 rounded-3xl border-2 border-primary opacity-0"
      />

      <Card
        className="w-full h-[min(420px,calc(100dvh-10rem))] rounded-3xl border border-stroke bg-background/20"
        isFooterBlurred
        isPressable
        shadow="lg"
        onPress={onOpen}>
        <span
          data-hx-num
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-4 z-20 rounded-xl bg-background/75 backdrop-blur-md px-3 py-1 text-3xl md:text-4xl font-extrabold leading-none text-primary opacity-40">
          {String(index + 1).padStart(2, "")}
        </span>

        <Image
          isZoomed
          removeWrapper
          className="w-full h-full inset-0 object-cover"
          src={imageUrl}
          alt={title}
          style={{ objectPosition: "50% 20%" }}
        />

        <CardFooter className="absolute bottom-0 z-10 flex items-center justify-between gap-3 px-6 py-4 bg-gray-200/80 dark:bg-slate-900/80 backdrop-blur-md">
          <span className="text-lg md:text-xl font-bold text-text truncate">
            {title}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {footerIcons}
          </div>
        </CardFooter>
      </Card>

      <DetailModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        imageUrl={imageUrl}
        title={title}
        description={description}
        stackList={stack}
        link={link}
      />
    </li>
  );
}

export default CardComponent;
