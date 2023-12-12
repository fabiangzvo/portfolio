import { useMemo } from "react";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

import Container from "../container";
import CardList from "./components/cardList";

function Portfolio() {
  const translations = useTranslations("portfolio");

  const items = useMemo(
    () => [
      {
        description: translations("conversionDescription"),
        title: translations("conversionTitle"),
        imageUrl: "/conversion.png",
        link: "https://web.zenvia.com/zenvia-conversion/login",
        isWork: true,
      },
      {
        description: translations("licimaticDescription"),
        title: translations("licimaticTitle"),
        imageUrl:
          "https://comunidad.socialab.com/uploads/15856940525e83c56415113.png",
        isWork: true,
      },
      {
        description: translations("spotyDescription"),
        title: translations("spotyTitle"),
        imageUrl: "/spotify.png",
        link: "https://spotify-client.vercel.app",
      },
    ],
    [translations]
  );

  return (
    <Container
      id="portfolio"
      label={translations("label")}
      description={translations("description")}
      classes={{
        container: "max-xl:flex-column",
        containerTitle:
          "max-2xl:w-full max-xl:flex-column max-xl:items-center max-xl:justify-center xl:mr-10 mb-10",
      }}
    >
      <CardList items={items} />
    </Container>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../translations/${locale}.json`)).default,
    },
  };
}

export default Portfolio;
