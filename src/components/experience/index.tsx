import { useMemo } from "react";
import { MdOutlineWork } from "react-icons/md";
import { useTranslations } from "next-intl";

import Badge from "@components/badge";

import Container from "../container";
import MilestonesList from "../milestonesList";
import { MilestoneList } from "../milestonesList/types";

function Experience() {
  const translations = useTranslations("experience");

  const items = useMemo<MilestoneList>(
    () => [
      {
        icon: <MdOutlineWork className="text-primary" size="2em" />,
        primaryText: translations("ultraDate"),
        secondaryText: <>{translations("ultraPosition")} &nbsp;
          <Badge label={translations("currently")} /></>,
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
      label={translations("label")}
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
