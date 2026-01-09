"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdOutlineError } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import Image from "next/image";

import Toast from "@components/toast";
import Container from "../container";
import ScrollButton from "./components/scrollButton";
import { ToastProps } from "@components/toast/types";
import Form from "./components/form";

function Contact() {
  const translations = useTranslations("contact");
  const [toast, setToast] = useState<null | Partial<ToastProps>>(null);

  const onclose = useCallback(() => setToast(null), []);

  const handleClick = useCallback<React.MouseEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isBottom =
        window.innerHeight + Math.round(window.scrollY) >=
        document.body.offsetHeight;

      const data = {
        email: e.currentTarget.email.value,
        subject: e.currentTarget.subject.value,
        data: e.currentTarget.message.value,
      };

      const { status } = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (status === 200) {
        setToast({
          content: translations("mailSent"),
          icon: <IoShieldCheckmark className="text-green-800 text-6xl" />,
        });

        return;
      }

      const icon = isBottom ? (
        <FaArrowUp className="font-extrabold" />
      ) : (
        <FaArrowDown className="font-extrabold" />
      );

      setToast({
        content: translations("mailFailed"),
        icon: <MdOutlineError className="text-red-800 text-5xl" />,
      });
    },
    [translations]
  );

  return (
    <Container
      id="contact"
      label={<span className="w-full flex flex-col items-center">
        <span className="relative h-[60vh] w-full flex justify-center items-end max-sm:scale-85 shape-4">
          <span className="texture-3 shape-4 bg-primary h-[60vh]" />
          <div className="w-full h-3/5 absolute bottom-32 max-md:bottom-20 max-sm:bottom-32 max-md:h-2/4 max-lg:h-3/6">
            <Image src="/avatar-shout-cut.png" alt="programmer" fill className="[clip-path:circle(70%)] [filter:drop-shadow(0_1px_12px_var(--shadow))] z-30 object-contain" />
          </div>
        </span>
        {translations("contact")}
      </span>}
      description={translations.raw("description")}
      classes={{
        container: "max-xl:flex-column",
        containerTitle:
          "max-2xl:w-full max-xl:flex-column max-xl:items-center max-xl:justify-center xl:mr-10 mb-10 mr-0",
      }}
      rightTitle
    >
      <Form handleClick={handleClick} />
      {toast && (
        <Toast
          content={toast.content}
          icon={toast.icon}
          timing={4000}
          reset={onclose}
        />
      )}
    </Container>
  );
}

export default Contact;
