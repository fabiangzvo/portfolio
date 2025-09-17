import { Modal, ModalContent, Image, ModalBody, ModalFooter, Button } from '@heroui/react'
import React from 'react'
import { useTranslations } from 'next-intl';

import { DetailModalProps } from '../types'

function DetailModal(props: DetailModalProps) {
  const { isOpen, onOpenChange, imageUrl, title, description, stackList, link } = props;

  const translations = useTranslations("portfolio");

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="4xl" classNames={{ closeButton: "text-primary hover:bg-primary/50" }}>
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
          <p className="flex gap-2 text-background">{stackList}</p>
          <Button size='lg' onPress={() => window.open(link, "_blank")} className='text-background px-10 font-semibold'>{translations("visit")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DetailModal