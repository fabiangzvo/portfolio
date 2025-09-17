import { useMemo } from "react";
import { Card, CardFooter, Image, useDisclosure, Tooltip } from "@heroui/react";

import { CardProps } from "../types";
import { STACK_LIST } from "../constants";
import DetailModal from "./detailModal";

function CardComponent(props: CardProps) {
  const { title, description, imageUrl, stackList, link } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const stack = useMemo(() => stackList.map((tech: string) => {
    const Icon = STACK_LIST[tech as keyof typeof STACK_LIST];

    return (
      <Tooltip key={tech} content={tech}>
        <div className="bg-primary rounded-full p-1">
          <Icon size={30} />
        </div>
      </Tooltip>
    );
  }), [stackList]);

  return (
    <>
      <Card className="max-w-[400px] min-w-[300px] bg-background/20" isFooterBlurred isPressable shadow="lg" onPress={onOpen}>
        <Image
          isZoomed
          removeWrapper
          className="rounded-t-lg max-md:w-full inset-0 object-cover h-56"
          src={imageUrl}
          alt={title}
          style={{ objectPosition: "50% 20%" }}
        />
        <CardFooter className="absolute dark:bg-slate-800/50 bottom-0 z-10 justify-center bg-gray-300/50">
          <span className="font-semibold">{title}</span>
        </CardFooter>
      </Card>
      <DetailModal isOpen={isOpen} onOpenChange={onOpenChange} imageUrl={imageUrl} title={title} description={description} stackList={stack} link={link} />
    </>
  );
}

export default CardComponent;
