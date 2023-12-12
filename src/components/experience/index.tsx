import { useMemo } from "react";
import { MdOutlineWork } from "react-icons/md";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";

import Container from "../container";
import MilestonesList from "../milestonesList";
import { MilestoneList } from "../milestonesList/types";

function Experience() {
  const translations = useTranslations("experience");

  const items = useMemo<MilestoneList>(
    () => [
      {
        icon: <MdOutlineWork className="text-secondary" size="2em" />,
        primaryText: (
          <>
            {translations("zenviaDate")} &nbsp;
            <span className="bg-primary text-secondary text-sm font-medium me-2 px-2.5 py-0.5 rounded">
              {translations("currently")}
            </span>
          </>
        ),
        secondaryText: translations("zenviaPosition"),
        description: translations("zenviaDescription"),
      },
      {
        icon: <MdOutlineWork className="text-secondary" size="2em" />,
        primaryText: translations("andikemDate"),
        secondaryText: translations("andikemPosition"),
        description: translations("andikemDescription"),
      },
      {
        icon: <MdOutlineWork className="text-secondary" size="2em" />,
        primaryText: translations("licimaticDate"),
        secondaryText: translations("licimaticPosition"),
        description: translations("licimaticDescription"),
      },
      {
        icon: <MdOutlineWork className="text-secondary" size="2em" />,
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

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../translations/${locale}.json`)).default,
    },
  };
}

export default Experience;
