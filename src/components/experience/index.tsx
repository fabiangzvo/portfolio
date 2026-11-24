import { useMemo } from "react";
import { MdOutlineWork } from "react-icons/md";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

import { MilestoneList } from "../milestonesList/types";
import TimeLine from "@components/TimeLine";

function Experience() {
  const translations = useTranslations("experience");

  const items = useMemo<MilestoneList>(
    () => [
      {
        icon: <MdOutlineWork className="text-primary" size="2em" />,
        primaryText: translations("lapzoDate"),
        secondaryText: translations("lapzoPosition"),
        description: translations("lapzoDescription"),
      },
      {
        icon: <MdOutlineWork className="text-primary" size="2em" />,
        primaryText: translations("redCapDate"),
        secondaryText: translations("redCapPosition"),
        description: translations("redCapDescription"),
      },
      {
        icon: <MdOutlineWork className="text-primary" size="2em" />,
        primaryText: translations("ultraDate"),
        secondaryText: translations("ultraPosition"),
        description: translations("ultraDescription"),
      },
      {
        icon: <MdOutlineWork className="text-primary" size="2em" />,
        primaryText: translations("zenviaDate"),
        secondaryText: translations("zenviaPosition"),
        description: translations("zenviaDescription"),
      },
      {
        icon: <MdOutlineWork className="text-primary" size="2em" />,
        primaryText: translations("andikemDate"),
        secondaryText: translations("andikemPosition"),
        description: translations("andikemDescription"),
      },
      {
        icon: <MdOutlineWork className="text-primary" size="2em" />,
        primaryText: translations("licimaticDate"),
        secondaryText: translations("licimaticPosition"),
        description: translations("licimaticDescription"),
      },
      {
        icon: <MdOutlineWork className="text-primary" size="2em" />,
        primaryText: translations("swatitDate"),
        secondaryText: translations("swatitPosition"),
        description: translations("swatitDescription"),
      },
    ],
    [translations],
  );

  const intro = (
    <div className="flex flex-row max-md:flex-col items-center justify-center gap-10 max-md:gap-5 font-albertSans pr-4 max-md:pr-0">
      <div className="w-[min(420px,84vw)] max-md:w-full max-md:order-last flex-shrink-0 flex flex-col justify-center max-md:items-center max-md:text-center">
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
      <div className="relative h-[50vh] w-[44vh] max-w-[75vw] max-md:h-[32vh] max-md:w-[32vh] flex-shrink-0 flex justify-center items-end">
        <span className="shape-1 box-texture bg-primary h-[44vh] max-md:h-[28vh] max-h-[75vw]" />
        <div className="w-full h-4/5 absolute bottom-0">
          <Image
            src="/user-programming.png"
            alt="programmer"
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
        id="experience"
        intro={intro}
        list={items}
        classes={{
          intro: "w-auto max-md:w-[calc(100vw-3rem)]",
        }}
      />
    </motion.div>
  );
}

export default Experience;
