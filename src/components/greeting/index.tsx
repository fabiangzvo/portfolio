import { useTranslations } from "next-intl";

import Dev from "@components/icons/dev";
import SocialNetwork from "@components/socialNetwork";
import WordTyping from "@components/wordChanger";

function Greeting() {
  const translation = useTranslations("main");

  return (
    <div className="w-full min-h-screen flex flex-col text-sm lg:flex">
      <div className="w-full h-full items-center justify-center text-sm flex font-albertSans max-lg:flex-col max-lg:mb-[9em]">
        <div className="flex flex-col w-full items-start justify-center max-lg:order-last">
          <h2 className="pointer-events-none text-paragraph text-5xl w-full max-lg:text-center">
            {translation("greeting")}
          </h2>
          <h1 className="pointer-events-none text-text w-full text-8xl font-extrabold max-lg:text-center max-md:text-7xl">
            Fabián Guzmán Otavo,
          </h1>
          <h2 className="pointer-events-none text-paragraph text-5xl w-full max-lg:text-center">
            <section className="flex flex-wrap">{translation("developer")}&nbsp;<WordTyping wordList={['Full Stack', 'Frontend']} /></section>
            <br />
            {translation("description")}
          </h2>
        </div>
        <div className="flex items-center justify-center max-lg:order-first max-md:py-10">
          <Dev />
        </div>
      </div>
      <SocialNetwork />
    </div>
  );
}

export default Greeting;
