import React, { useMemo } from "react";
import { GiGraduateCap } from "react-icons/gi";
import { FaStar } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { useTranslations } from "next-intl";

import Container from "../container";
import MilestonesList from "../milestonesList";

function Education() {
  const translations = useTranslations("education");

  const items = useMemo(
    () => [
      {
        icon: <FaClock className="text-primary" size="1.5em" />,
        primaryText: translations("professionalDate"),
        secondaryText: translations("professionalTitle"),
        description: translations("professionalDescription"),
      },
      {
        icon: <GiGraduateCap className="text-primary" size="2em" />,
        primaryText: translations("technologistDate"),
        secondaryText: translations("technologistTitle"),
        description: translations("technologistDescription"),
      },
      {
        icon: <FaStar className="text-primary" size="2em" />,
        primaryText: translations("hackathonDate"),
        secondaryText: translations("hackathonTitle"),
        description: translations("hackathonDescription"),
      },
      {
        icon: <GiGraduateCap className="text-primary" size="2em" />,
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
      <MilestonesList list={items} disableViewMore />
    </Container>
  );
}

export default Education;
