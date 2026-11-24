import type { ReactNode, Ref } from "react";

import type { MilestoneItemProps, MilestoneList } from "../milestonesList/types";

export type HorizontalTimelineLabels = {
  viewMore: string;
  viewLess: string;
};

export type HorizontalTimelineClasses = {
  section?: string;
  track?: string;
  intro?: string;
  card?: string;
};

export type HorizontalTimelineProps<T = MilestoneItemProps> = {
  /** Items to render with the default Milestone card, same shape used by MilestonesList */
  list?: MilestoneList;
  /** Custom items array when using a custom `renderItem` renderer (e.g. Portfolio cards) */
  items?: readonly T[];
  /** Custom item renderer; should return an `<li data-hx-card>` element */
  renderItem?: (item: T, index: number) => ReactNode;
  /** Hides the top progress line so only the horizontal cards are shown */
  hideProgressLine?: boolean;
  /** Optional first panel (image, title, description…) that scrolls with the cards */
  intro?: ReactNode;
  id?: string;
  /** Accessible name for the section when there is no visible heading inside `intro` */
  "aria-label"?: string;
  /** Height of the sticky navbar in px, so the pinned area starts right below it */
  stickyOffset?: number;
  /** Below this viewport height the component falls back to a native horizontal scroller */
  minPinnedHeight?: number;
  /** Labels for the "view more / view less" toggle. Without them the toggle is not rendered */
  labels?: HorizontalTimelineLabels;
  classes?: HorizontalTimelineClasses;
  /** React 19: ref is a regular prop, no forwardRef needed */
  ref?: Ref<HTMLElement>;
};

export type HorizontalTimelineItemProps = MilestoneItemProps & {
  index: number;
  labels?: HorizontalTimelineLabels;
  className?: string;
};
