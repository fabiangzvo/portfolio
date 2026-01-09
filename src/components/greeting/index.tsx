import { useTranslations } from "next-intl";
import Image from "next/image";

import SocialNetwork from "@components/socialNetwork";
import WordTyping from "@components/wordWriter";

function Greeting() {
  const translation = useTranslations("main");
  return (
    <section className="w-full min-h-screen flex flex-col text-sm lg:flex relative">
      <div className="w-full h-full items-center justify-center text-sm flex font-albertSans max-lg:flex-col max-lg:mb-[9em] max-sm:mb-[11em]">
        <div className="flex flex-col w-full items-start justify-center max-lg:order-last">
          <h2 className="pointer-events-none text-paragraph text-2xl w-full max-lg:text-center">
            {translation("greeting")}
          </h2>
          <h1 className="pointer-events-none text-text w-full text-6xl font-extrabold max-lg:text-center max-md:text-7xl">
            Fabián Guzmán Otavo,
          </h1>
          <div className="pointer-events-none text-paragraph text-2xl w-full max-lg:text-center">
            <section className="flex flex-wrap justify-start max-lg:justify-center">
              {translation("iam")}&nbsp;
              <WordTyping wordList={[translation("developer.0"), translation("developer.1"), translation("developer.2")]} />
            </section>
            {translation("description")}
          </div>
        </div>
        <div className="relative flex items-center justify-center max-lg:order-first max-md:py-10 max-sm:mt-4 max-lg:mt-4 mt-8 h-[65vh] max-md:h-[50vh]">
          <div className="w-[50vw] h-[50vh] bg-cover bg-center bg-primary rounded-3xl max-md:w-[90vw] max-md:h-[40vh] box-texture" />
          <Image src="/avatar-greeting.png" alt="Dev" fill className="absolute z-20 object-contain [clip-path:circle(60%)] [filter:drop-shadow(0_6px_12px_var(--shadow))]" />
        </div >
      </div >
      <SocialNetwork />
    </section >
  );
}


export default Greeting;
