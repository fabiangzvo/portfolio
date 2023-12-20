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
      className={`w-[90vw] flex min-h-screen flex-col items-center justify-around max-md:w-screen ${inter.className}`}
    >
      <div className="w-full h-[100vh] flex flex-col font-mono text-sm lg:flex">
        <div className="w-full h-[100vh] items-center justify-center font-mono text-sm lg:flex">
          <div className="flex flex-col h-full w-full items-start justify-center">
            <h3 className="pointer-events-none text-paragraph flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 text-4xl max-md:text-2xl">
              {translation("greeting")}
            </h3>
            <h1 className="pointer-events-none text-text w-full text-9xl max-md:text-7xl font-extrabold">
              Fabián Guzmán Otavo,
            </h1>
            <h1 className="pointer-events-none text-paragraph w-full text-7xl max-md:text-5xl font-extrabold">
              soy Full Stack Developer
            </h1>
            <h3 className="pointer-events-none text-paragraph flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 text-4xl">
              {translation("description")}
            </h3>
          </div>
          <div className="flex flex-col h-full w-1/2 items-center justify-center">
            <Dev />
          </div>
        </div>
        <SocialNetwork />
      </div>
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
