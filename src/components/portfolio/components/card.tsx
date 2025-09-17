import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Card, CardFooter, Image, useDisclosure, ModalBody, ModalContent, Modal, ModalFooter } from "@heroui/react";

import Button from "@components/button";

import { CardProps } from "../types";
import { STACK_LIST } from "../constants";

function CardComponent(props: CardProps) {
  const { title, description, imageUrl, stackList, link } = props;
  const translations = useTranslations("portfolio");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const stack = useMemo(() => stackList.map((tech: string) => {
    const Icon = STACK_LIST[tech as keyof typeof STACK_LIST];

    return (
      <div key={tech} className="bg-primary rounded-full p-1">
        <Icon size={30} />
      </div>);
  }), [stackList]);

  return (
    <>
      <Card className="max-w-[400px] min-w-[300px] bg-background/20" isFooterBlurred isPressable shadow="sm" onPress={onOpen}>
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="4xl">
        <ModalContent className="min-h-[50vh]">
          <Image
            removeWrapper
            className="object-cover -z-20 rounded-b-none border-b-1"
            src={imageUrl}
            alt={title}
            style={{ objectPosition: "50% 20%" }}
          />
          <ModalBody className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold my-2">{title}</h1>
            <p className="text-base">{description}</p>
          </ModalBody>
          <ModalFooter className="flex justify-between gap-10 items-center">
            <p className="flex gap-2 text-background">{stack}</p>
            <Button onClick={() => window.open(link, "_blank")} label={translations("visit")} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CardComponent;
