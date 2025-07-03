import { useTranslations } from "next-intl";

import Dev from "@components/icons/dev";
import SocialNetwork from "@components/socialNetwork";
import WordTyping from "@components/wordWriter";

function Greeting() {
  const translation = useTranslations("main");
  return (
    <section className="w-full min-h-screen flex flex-col text-sm lg:flex">
      <div className="w-full h-full items-center justify-center text-sm flex font-albertSans max-lg:flex-col max-lg:mb-[9em] max-sm:mb-[15em]">
        <div className="flex flex-col w-full items-start justify-center max-lg:order-last">
          <h2 className="pointer-events-none text-paragraph text-4xl w-full max-lg:text-center">
            {translation("greeting")}
          </h2>
          <h1 className="pointer-events-none text-text w-full text-8xl font-extrabold max-lg:text-center max-md:text-7xl">
            Fabián Guzmán Otavo,
          </h1>
          <div className="pointer-events-none text-paragraph text-4xl w-full max-lg:text-center">
            <section className="flex flex-wrap justify-start max-lg:justify-center">
              {translation("iam")}&nbsp;
              <WordTyping wordList={[translation("developer.0"), translation("developer.1"), translation("developer.2")]} />
            </section>
            {translation("description")}
          </div>
        </div>
        <div className="flex items-center justify-center max-lg:order-first max-md:py-10 max-sm:mt-32">
          <Dev />
        </div>
      </div>
      <SocialNetwork />
    </section>
  );
}

export default Greeting;
