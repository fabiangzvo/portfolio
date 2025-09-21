import { useTranslations } from "next-intl";
import Image from "next/image";

import Container from "../container";

function About() {
  const translations = useTranslations("about");

  return (
    <Container
      id="about"
      label={<span className="w-full text-center flex flex-col justify-center">
        <span className=" h-[60vh] w-full flex justify-center items-center max-sm:scale-85 blob">
          <span className="blob blob-6 bg-primary h-[60vh]" />
          <Image src="/avatar.png" alt="programmer" width={250} height={250} className="[clip-path:circle(70%)] [filter:drop-shadow(0_1px_12px_var(--shadow))] absolute z-30 max-sm:bottom-24" />
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
