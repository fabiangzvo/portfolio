import React, { useMemo } from "react";
import { GiGraduateCap } from "react-icons/gi";
import { FaStar } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

import Container from "../container";
import MilestonesList from "../milestonesList";

function Education() {
  const translations = useTranslations("education");

  const items = useMemo(
    () => [
      {
        icon: <FaClock className="text-secondary" size="1.5em" />,
        primaryText: translations("professionalDate"),
        secondaryText: translations("professionalTitle"),
        description: translations("professionalDescription"),
      },
      {
        icon: <GiGraduateCap className="text-secondary" size="2em" />,
        primaryText: translations("technologistDate"),
        secondaryText: translations("technologistTitle"),
        description: translations("technologistDescription"),
      },
      {
        icon: <FaStar className="text-secondary" size="2em" />,
        primaryText: translations("hackathonDate"),
        secondaryText: translations("hackathonTitle"),
        description: translations("hackathonDescription"),
      },
      {
        icon: <GiGraduateCap className="text-secondary" size="2em" />,
        primaryText: translations("technicianDate"),
        secondaryText: translations("technicianTitle"),
        description: translations("technicianDescription"),
      },
    ],
    [translations]
  );

  return (
    <Container
      id="education"
      label={translations("label")}
      description={translations("description")}
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

export default Education;