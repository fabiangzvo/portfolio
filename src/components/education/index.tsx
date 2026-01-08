import React, { useMemo } from "react";
import { GiGraduateCap } from "react-icons/gi";
import { FaStar } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { useTranslations } from "next-intl";
import Image from "next/image";

import Container from "../container";
import MilestonesList from "../milestonesList";

function Education() {
  const translations = useTranslations("education");

  const items = useMemo(
    () => [
      {
        icon: <GiGraduateCap className="text-primary" size="2em" />,
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
      label={<span className="w-full flex flex-col items-center">
        <span className="relative h-[60vh] w-full flex justify-center items-end max-sm:scale-85">
          <span className="shape-3 texture-1 bg-primary h-[60vh]" />
          <div className="w-full h-3/5 absolute bottom-40 max-md:h-2/4">
            <Image src="/avatar-read.png" alt="programmer" fill className="[clip-path:circle(70%)] [filter:drop-shadow(0_6px_12px_var(--shadow))] z-30 object-contain" />
          </div>
        </span>
        {translations("label")}
      </span>}
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
