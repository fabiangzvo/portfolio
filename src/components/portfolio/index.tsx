import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

import TimeLine from "@components/TimeLine";

import Card from "./components/card";
import { CardProps } from "./types";

function Portfolio() {
  const translations = useTranslations("portfolio");

  const items = useMemo<CardProps[]>(
    () => [
      {
        description: translations("wordSearchDescription"),
        title: translations("wordSearchTitle"),
        imageUrl: "/word-puzzle.png",
        link: "https://word-search-puzzle.vercel.app",
        stackList: ["react", "next", "typescript", "tailwind"],
      },
      {
        description: translations("3designDescription"),
        title: translations("3designTitle"),
        imageUrl: "/3design.png",
        link: "https://3-design.netlify.app",
        stackList: ["react", "next", "typescript", "tailwind"],
      },
      {
        description: translations("dummyDescription"),
        title: translations("dummyTitle"),
        imageUrl: "/dummy-app.png",
        link: "https://dummy-social-network.netlify.app",
        stackList: ["react", "next", "typescript", "tailwind"],
      },
      {
        description: translations("spotyDescription"),
        title: translations("spotyTitle"),
        imageUrl: "/spotify-redesign.PNG",
        link: "https://spotify-client.vercel.app",
        stackList: ["react", "next", "typescript", "tailwind"],
      },
      {
        description: translations("quizzifyDescription"),
        title: translations("quizzifyTitle"),
        imageUrl: "/quizzify.png",
        link: "https://brain-quizzify.netlify.app",
        stackList: ["react", "next", "typescript", "tailwind"],
      },
    ],
    [translations],
  );

  const intro = (
    <div className="flex flex-row max-md:flex-col items-center justify-center gap-10 max-md:gap-5 font-albertSans pr-4 max-md:pr-0">
      <div className="w-[min(440px,84vw)] max-md:w-full max-md:order-last flex-shrink-0 flex flex-col justify-center max-md:items-center max-md:text-center">
        <h1 className="font-albertSans pointer-events-none font-extrabold fill-text-transparent bg-clip-text bg-gradient-to-r to-tertiary from-primary mb-4 text-5xl md:text-6xl max-md:text-4xl">
          {translations("label")}
        </h1>
        <span
          className="text-lg md:text-xl max-md:text-base text-paragraph pointer-events-none leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: translations("description") || "",
          }}
        />
      </div>
      <div className="relative h-[50vh] w-[44vh] max-w-[75vw] max-md:h-[30vh] max-md:w-[30vh] flex-shrink-0 flex justify-center items-end">
        <span className="shape-2 texture-3 bg-primary h-[44vh] max-md:h-[26vh] max-h-[75vw]" />
        <div className="w-full h-4/5 absolute bottom-0">
          <Image
            src="/user-pc.png"
            alt="portfolio"
            fill
            className="[clip-path:circle(70%)] [filter:drop-shadow(0_6px_12px_var(--shadow))] z-30 object-contain"
          />
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.1 }}
      transition={{ bounce: 0.4, duration: 1 }}
      className="w-full flex items-center">
      <TimeLine
        id="portfolio"
        hideProgressLine
        intro={intro}
        items={items}
        renderItem={(item, index) => (
          <Card key={item.title} index={index} {...item} />
        )}
        classes={{
          intro: "w-auto max-md:w-[calc(100vw-3rem)]",
        }}
      />
    </motion.div>
  );
}

export default Portfolio;
