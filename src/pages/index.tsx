import "@theme-toggles/react/css/Classic.css";

import { Albert_Sans } from "next/font/google";
import { GetStaticPropsContext } from "next";
import { AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";

import Education from "@components/education";
import Experience from "@components/experience";
import Portfolio from "@components/portfolio";
import Contact from "@components/contact";
import About from "@components/about";
import Greeting from "@components/greeting";
import Head from "@components/head";
import { SmoothScrollContainer } from "@hooks/useHorizontalScroll";
import { ScrollSection } from "@components/ScrollSection";
import { HorizontalScrollSection } from "@components/ScrollSection/HorizontalScrollSection";

const AlbertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--albert-sans",
});

export default function Home() {
  return (
    <SmoothScrollContainer
      className={twMerge(
        "w-full min-h-screen flex flex-col items-center justify-around lg:w-[90vw] max-lg:px-5 max-sm:px-0",
        AlbertSans.variable,
      )}>
      <Head />
      <AnimatePresence mode="wait">
        <ScrollSection
          key="greeting"
          className="w-full min-h-screen flex items-center justify-center ">
          <Greeting />
        </ScrollSection>
        <ScrollSection
          key="about"
          className="w-full min-h-auto flex items-center justify-center">
          <About />
        </ScrollSection>
        <HorizontalScrollSection
          key="experience"
          className="w-screen h-screen overflow-hidden bg-background"
          trackClassName="flex h-screen items-stretch"
          itemClassName="w-screen h-screen flex-shrink-0 overflow-hidden"
          slideInnerClassName="pt-16 pb-6">
          <Experience />
        </HorizontalScrollSection>
        <ScrollSection
          key="education"
          className="w-full min-h-auto flex items-center justify-center">
          <Education />
        </ScrollSection>
        <HorizontalScrollSection
          key="portfolio"
          className="w-screen h-screen overflow-hidden bg-background"
          trackClassName="flex h-screen items-stretch"
          itemClassName="w-screen h-screen flex-shrink-0 overflow-hidden"
          slideInnerClassName="pt-16 pb-6">
          <Portfolio />
        </HorizontalScrollSection>
        <ScrollSection
          key="contact"
          className="w-full min-h-auto flex items-center justify-center">
          <Contact />
        </ScrollSection>
      </AnimatePresence>
    </SmoothScrollContainer>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../translations/${locale}.json`)).default,
    },
  };
}
