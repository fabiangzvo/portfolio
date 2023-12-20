import { Inter } from "next/font/google";
import { GetStaticPropsContext } from "next";

import Education from "@components/education";
import Experience from "@components/experience";
import Portfolio from "@components/portfolio";
import Contact from "@components/contact";
import About from "@components/about";
import Greeting from "@components/greeting";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  return (
    <main
      className={`w-full min-h-screen flex flex-col items-center justify-around lg:w-[90vw] max-lg:px-5 ${inter.className}`}
    >
      <Greeting />
      <About />
      <Education />
      <Experience />
      <Portfolio />
      <Contact />
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
