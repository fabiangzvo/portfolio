import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { Inter } from "next/font/google";

import Education from "@components/education";
import Experience from "@components/experience";
import Portfolio from "@components/portfolio";
import Contact from "@components/contact";
import About from "@components/about";
import Dev from "@components/icons/dev";
import SocialNetwork from "@components/socialNetwork";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const translation = useTranslations("main");

  return (
    <main
      className={`w-[90vw] flex min-h-screen flex-col items-center justify-around ${inter.className}`}
    >
      <div className="w-full h-[100vh] flex flex-col font-mono text-sm lg:flex">
        <div className="w-full h-[100vh] items-center justify-center font-mono text-sm lg:flex">
          <div className="flex flex-col h-full w-full items-start justify-center">
            <h3 className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 text-4xl max-md:text-2xl">
              {translation("greeting")}
            </h3>
            <div className="h-9 w-9 rounded-full blur-lg bg-primary absolute bottom-[9em]"></div>
            <div className="h-40 w-40 z-[-1] rounded-full blur-lg bg-secondary absolute left-[45vw] top-[38vh]"></div>
            <h1 className="pointer-events-none text-text w-full text-9xl max-md:text-7xl font-extrabold">
              Fabián Guzmán Otavo,
            </h1>
            <h1 className="pointer-events-none text-text w-full text-7xl max-md:text-5xl font-extrabold">
              soy Full Stack Developer
            </h1>
            <h3 className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 text-4xl">
              {translation("description")}
            </h3>
          </div>
          <div className="flex flex-col h-full w-1/2 items-center justify-center from-white">
            <Dev />
          </div>
        </div>
        <SocialNetwork />
      </div>
      <svg
        className="absolute fill-primary top-[100vh]  rotate-180 scale-x-100 -scale-y-100"
        width="100%"
        height="400"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 30 73 L 100 0 V 10 Z" strokeWidth="0" />
      </svg>
      <About />
      <svg
        className="absolute fill-primary top-[200vh] rotate-180 scale-x-100 -scale-y-100"
        width="100%"
        height="400"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 30 73 L 100 0 V 10 Z" strokeWidth="0" />
      </svg>
      <Education />
      <svg
        className="absolute fill-primary top-[300vh] rotate-180 scale-x-100 -scale-y-100"
        width="100%"
        height="400"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 30 73 L 100 0 V 10 Z" strokeWidth="0" />
      </svg>
      <Experience />
      <svg
        className="absolute fill-primary top-[400vh]"
        width="100%"
        height="400"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 30 73 L 100 0 V 10 Z" strokeWidth="0" />
      </svg>
      <Portfolio />
      <svg
        className="absolute fill-primary top-[500vh] rotate-180 scale-x-100 -scale-y-100 -z-[1]"
        width="100%"
        height="400"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 30 73 L 100 0 V 10 Z" strokeWidth="0" />
      </svg>
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
