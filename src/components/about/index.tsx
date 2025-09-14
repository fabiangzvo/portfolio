import { useTranslations } from "next-intl";

import Container from "../container";
import Image from "next/image";

function About() {
  const translations = useTranslations("about");

  return (
    <Container
      id="about"
      label={<span className="w-full">
        <span className="relative w-full flex justify-center">
          <Image src="/user-programming.png" alt="programmer" width={250} height={250} className="[clip-path:circle(70%)] [filter:drop-shadow(0_6px_12px_var(--shadow))]" />
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
