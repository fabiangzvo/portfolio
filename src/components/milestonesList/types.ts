export type MilestoneItemProps = {
  icon: React.ReactNode;
  description: string;
  primaryText: string | React.ReactNode;
  secondaryText: string;
  disableViewMore?: boolean;
};

export type MilestoneList = Array<MilestoneItemProps>;

export type MilestoneProps = {
  list: MilestoneList;
  disableViewMore?: boolean;
};
