import React, { useMemo } from "react";

import { MilestoneProps } from "./types";
import MilestoneItem from "./components/milestoneItem";

function MilestonesList(props: MilestoneProps) {
  const { list = [], disableViewMore } = props;

  const items = useMemo(
    () =>
      list.map(({ icon, description, primaryText, secondaryText }, index) => (
        <MilestoneItem
          key={index}
          icon={icon}
          description={description}
          primaryText={primaryText}
          secondaryText={secondaryText}
          disableViewMore={disableViewMore}
        />
      )),
    [list, disableViewMore]
  );

  return <ol className="relative ml-10">{items}</ol>;
}

export default MilestonesList;
