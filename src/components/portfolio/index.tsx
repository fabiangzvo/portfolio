import { useMemo } from "react";
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
        description: translations("dummyDescription"),
        title: translations("dummyTitle"),
        imageUrl: "/dummy-app.png",
        link: "https://dummy-social-network.netlify.app",
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

export default Portfolio;
