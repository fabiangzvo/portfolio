import "@theme-toggles/react/css/Classic.css"

import { Albert_Sans } from "next/font/google";
import { GetStaticPropsContext } from "next";
import { AnimatePresence } from "framer-motion";

import Education from "@components/education";
import Experience from "@components/experience";
import Portfolio from "@components/portfolio";
import Contact from "@components/contact";
import About from "@components/about";
import Greeting from "@components/greeting";
import Head from "@components/head";

const AlbertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--albert-sans",
});

export default function Home() {
  return (
    <main
      className={`w-full min-h-screen flex flex-col items-center justify-around lg:w-[90vw] max-lg:px-5 ${AlbertSans.variable}`}
    >
      <Head />
      <AnimatePresence mode="wait">
        <Greeting />
        <About />
        <Experience />
        <Education />
        <Portfolio />
        <Contact />
      </AnimatePresence>
    </main>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../translations/${locale}.json`)).default,
    },
  };
}
