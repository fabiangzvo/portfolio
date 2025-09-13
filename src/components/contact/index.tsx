"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdOutlineError } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

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
        name: e.currentTarget.contactName.value,
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
        content: (
          <>
            {translations("mailFailed")}&nbsp;
            <ScrollButton
              callback={onclose}
              scrollTo={isBottom ? "up" : "down"}
              label={icon}
            />
          </>
        ),
        icon: <MdOutlineError className="text-red-800 text-5xl" />,
      });
    },
    [onclose, translations]
  );

  return (
    <Container
      id="contact"
      label={translations("contact")}
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
