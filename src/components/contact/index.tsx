import React from "react";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

import Container from "../container";

function Contact() {
  const translations = useTranslations("contact");

  return (
    <Container
      id="contact"
      label={translations("label")}
      description={translations.raw("description")}
      classes={{
        container: "max-xl:flex-column",
        containerTitle:
          "max-2xl:w-full max-xl:flex-column max-xl:items-center max-xl:justify-center xl:mr-10 mb-10",
      }}
    >
      <form
        className="flex flex-col w-full bg-background border border-secondary rounded-xl px-[6em] py-[6em] shadow-lg shadow-primary"
        action="submit"
      >
        <h1 className="pointer-events-none text-text w-full text-center text-3xl font-extrabold w-full text-white font-extrabold mb-10">
          {translations("contact")}
        </h1>
        <div className="mb-10">
          <label htmlFor="name" className="block mb-2 text-xl text-text">
            {translations("name")}
          </label>
          <input
            type="text"
            id="name"
            className="bg-tertiary border-primary text-lg rounded-lg block w-full p-2.5"
            placeholder="Fabián Guzmán O."
            required
          />
        </div>
        <div className="mb-10">
          <label htmlFor="email" className="block mb-2 text-xl text-text">
            {translations("email")}
          </label>
          <input
            type="email"
            id="email"
            className="bg-tertiary border-primary text-lg rounded-lg block w-full p-2.5"
            placeholder="example@example.com"
            required
          />
        </div>
        <div className="mb-10">
          <label htmlFor="message" className="block mb-2 text-xl text-text">
            {translations("message")}
          </label>
          <textarea
            id="message"
            className="bg-tertiary border-primary text-lg rounded-lg block w-full p-2.5"
            placeholder={translations("messagePlaceholder")}
          ></textarea>
        </div>
        <button className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xl font-medium text-text rounded-lg group bg-gradient-to-br from-secondary to-primary group-hover:from-primary group-hover:to-secondary focus:ring-4 focus:outline-none focus:ring-primary">
          <span className="relative text-text w-full px-5 py-2.5 transition-all ease-in duration-75 bg-background rounded-md group-hover:bg-transparent">
            {translations("send")}
          </span>
        </button>
      </form>
    </Container>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../translations/${locale}.json`)).default,
    },
  };
}

export default Contact;
