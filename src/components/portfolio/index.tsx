import { useMemo } from "react";
import { useTranslations } from "next-intl";

import Container from "../container";
import CardList from "./components/cardList";

function Portfolio() {
  const translations = useTranslations("portfolio");

  const items = useMemo(
    () => [
      {
        description: translations("wordSearchDescription"),
        title: translations("wordSearchTitle"),
        imageUrl: "/word-puzzle.png",
        link: "https://word-search-puzzle.vercel.app",
      },
      {
        description: translations("3designDescription"),
        title: translations("3designTitle"),
        imageUrl: "/3design.png",
        link: "https://3-design.netlify.app",
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
        imageUrl: "/spotify-redesign.PNG",
        link: "https://spotify-client.vercel.app",
      },
      {
        description: translations("quizzifyDescription"),
        title: translations("quizzifyTitle"),
        imageUrl: "/quizzify.png",
        link: "https://brain-quizzify.netlify.app",
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
        container: "max-xl:flex-column h-full",
        containerTitle:
          "max-2xl:w-full max-xl:flex-column max-xl:items-center max-xl:justify-center xl:mr-10 mb-10",
      }}
    >
      <CardList items={items} />
    </Container>
  );
}

export default Portfolio;
