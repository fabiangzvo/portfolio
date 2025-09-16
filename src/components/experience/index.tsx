import { useMemo } from "react";
import { MdOutlineWork } from "react-icons/md";
import { useTranslations } from "next-intl";
import Image from "next/image";

import Badge from "@components/badge";

import Container from "../container";
import MilestonesList from "../milestonesList";
import { MilestoneList } from "../milestonesList/types";

function Experience() {
  const translations = useTranslations("experience");

  const items = useMemo<MilestoneList>(
    () => [{
      icon: <MdOutlineWork className="text-primary" size="2em" />,
      primaryText: translations("redCapDate"),
      secondaryText: <>{translations("redCapPosition")} &nbsp;
        <Badge label={translations("currently")} /></>,
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
    [translations]
  );

  return (
    <Container
      id="experience"
      label={<span className="w-full flex flex-col items-center">
        <span className="relative w-full flex justify-center">
          <Image src="/user-programming.png" alt="programmer" width={250} height={250} className="[clip-path:circle(70%)] [filter:drop-shadow(0_6px_12px_var(--shadow))]" />
        </span>
        {translations("label")}
      </span>}
      description={translations("description")}
      rightTitle
      classes={{
        container: "max-xl:flex-column",
        containerTitle:
          "max-2xl:w-full max-xl:flex-column max-xl:items-center max-xl:justify-center xl:mr-10 mb-10",
      }}
    >
      <MilestonesList list={items} />
    </Container>
  );
}

export default Experience;
