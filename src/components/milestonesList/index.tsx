import React, { useMemo } from "react";

import { MilestoneProps } from "./types";
import MilestoneItem from "./components/milestoneItem";

function MilestonesList(props: MilestoneProps) {
  const { list = [] } = props;

  const items = useMemo(
    () =>
      list.map(({ icon, description, primaryText, secondaryText }, index) => (
        <MilestoneItem
          key={index}
          icon={icon}
          description={description}
          primaryText={primaryText}
          secondaryText={secondaryText}
        />
      )),
    [list]
  );

  return <ol className="relative ml-10">{items}</ol>;
}

export default MilestonesList;
