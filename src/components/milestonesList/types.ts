export type MilestoneList = Array<{
  icon: React.ReactNode;
  primaryText: string | React.ReactNode;
  secondaryText: string;
  description: string;
}>;

export type MilestoneProps = {
  list: MilestoneList;
};
