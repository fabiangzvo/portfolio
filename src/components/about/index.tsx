import { useTranslations } from "next-intl";
import Image from "next/image";

import Container from "../container";

function About() {
  const translations = useTranslations("about");

  return (
    <Container
      id="about"
      label={<span className="w-full text-center flex flex-col justify-center">
        <span className="relative h-[60vh] w-full flex justify-center items-end max-sm:scale-85 blob">
          <span className="blob blob-6 bg-primary h-[60vh]" />
          <div className="w-full h-3/5 absolute bottom-32 max-md:bottom-20 max-sm:bottom-18 max-md:h-2/4">
            <Image src="/avatar.png" alt="programmer" fill className="[clip-path:circle(70%)] [filter:drop-shadow(0_1px_12px_var(--shadow))] z-30 object-contain" />
          </div>
        </span>
        {translations("label")}
      </span>}
      classes={{
        container: "max-xl:flex-column",
        containerTitle:
          "max-2xl:w-full max-xl:flex-column max-xl:items-center max-xl:justify-center xl:mr-10 mb-10",
      }}
      rightTitle
    >
      <div className="relative flex flex-col">
        <span
          className="w-full text-base"
          dangerouslySetInnerHTML={{ __html: translations("description") }}
        />
      </div>
    </Container>
  );
}

export default About;
