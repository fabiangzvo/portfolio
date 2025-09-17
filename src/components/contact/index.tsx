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
        <span className="relative w-full flex justify-center">
          <Image src="/avatar-shout-cut.png" alt="programmer" width={250} height={250} className="[clip-path:circle(70%)] [filter:drop-shadow(0_1px_12px_var(--shadow))]" />
        </span>
        {translations("contact")}
      </span>}
      description={translations.raw("description")}
      classes={{
        container: "max-xl:flex-column",
        containerTitle:
          "max-2xl:w-full max-xl:flex-column max-xl:items-center max-xl:justify-center xl:mr-10 mb-10",
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
