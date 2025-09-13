import { useTranslations } from "next-intl";

import Container from "../container";

function About() {
  const translations = useTranslations("about");

  return (
    <Container
      id="about"
      label={translations("label")}
      classes={{
        container: "max-xl:flex-column",
        containerTitle:
          "max-2xl:w-full max-xl:flex-column max-xl:items-center max-xl:justify-center xl:mr-10 mb-10",
      }}
    >
      <span
        className="w-full text-base"
        dangerouslySetInnerHTML={{ __html: translations("description") }}
      />
    </Container>
  );
}

export default About;
