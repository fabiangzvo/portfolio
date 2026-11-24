"use client";

import type { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

import { useHorizontalViewTimeline } from "@hooks/useHorizontalViewTimeline";

import TimelineItem from "./components/timelineItem";
import type { HorizontalTimelineProps } from "./types";

// Styles applied when driven by GSAP (either standalone "pinned" or inside <HorizontalScrollSection> "embedded")
const PINNED_MODES =
  "group-data-[mode=pinned]/hx:snap-none group-data-[mode=pinned]/hx:flex group-data-[mode=pinned]/hx:h-[calc(100dvh-var(--hx-offset))] group-data-[mode=pinned]/hx:items-center group-data-[mode=pinned]/hx:overflow-hidden group-data-[mode=pinned]/hx:py-0 group-data-[mode=embedded]/hx:snap-none group-data-[mode=embedded]/hx:overflow-hidden group-data-[mode=embedded]/hx:py-4";

function HorizontalTimeline(props: HorizontalTimelineProps) {
  const {
    list = [],
    intro,
    id,
    stickyOffset = 64,
    minPinnedHeight = 620,
    labels,
    classes = {},
    ref,
    "aria-label": ariaLabel,
  } = props;

  const { pinRef, stickyRef, trackRef, listRef } = useHorizontalViewTimeline({
    stickyOffset,
    minPinnedHeight,
    itemsKey: list,
  });

  return (
    <section
      ref={ref}
      id={id}
      data-hx-timeline
      aria-label={ariaLabel}
      className={twMerge("relative w-full", classes.section)}>
      <div
        ref={pinRef}
        data-hx-pin
        className="group/hx relative"
        style={{ "--hx-offset": `${stickyOffset}px` } as CSSProperties}>
        <div
          ref={stickyRef}
          data-hx-viewport
          aria-label={ariaLabel}
          className={twMerge(
            "relative snap-x snap-mandatory overflow-x-auto py-16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
            PINNED_MODES,
          )}>
          <div
            ref={trackRef}
            data-hx-track
            className={twMerge(
              "relative flex w-max items-start gap-16 md:gap-20 px-6 will-change-transform group-data-[mode=pinned]/hx:items-center group-data-[mode=embedded]/hx:items-center lg:px-32",
              classes.track,
            )}>
            {intro && (
              <div
                className={twMerge(
                  "w-auto flex-none shrink-0 snap-start",
                  classes.intro,
                )}>
                {intro}
              </div>
            )}

            <div
              ref={listRef}
              data-hx-list
              className="relative pt-[88px] max-md:pt-[72px] shrink-0">
              {/* Base line + progress fill (the fill is animated by the hook) */}
              <div
                aria-hidden="true"
                className="absolute left-0 right-0 top-[30px] max-md:top-[24px] h-1 overflow-hidden rounded-full bg-stroke">
                <span
                  data-hx-fill
                  className="absolute inset-0 origin-left bg-gradient-to-r from-primary to-highlight"
                />
              </div>

              <ol className="flex list-none items-start gap-8 md:gap-10">
                {list.map((item, index) => (
                  <TimelineItem
                    key={index}
                    {...item}
                    index={index}
                    labels={labels}
                    className={classes.card}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HorizontalTimeline;
