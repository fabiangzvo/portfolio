"use client";

import { Children, useRef, type HTMLAttributes, type ReactNode } from "react";
import { useHorizontalScroll, useSmoothScrollContext } from "@/hooks/useHorizontalScroll";

export interface HorizontalScrollSectionProps<T = unknown>
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /**
   * Optional data array to render horizontally.
   * When provided alongside `renderItem`, each item is rendered inside the horizontal track.
   */
  items?: readonly T[];
  /** Render function for each item when `items` is provided */
  renderItem?: (item: T, index: number) => ReactNode;
  /** Optional custom key extractor for `items` */
  keyExtractor?: (item: T, index: number) => string | number;
  /**
   * Direct React children to place inside the horizontal track.
   * Can be used instead of (or in addition to) `items` + `renderItem`.
   */
  children?: ReactNode;
  /** Classes applied to the outer pinned `<section>` */
  className?: string;
  /** Classes applied to the inner horizontal track (`pin-wrap`) */
  trackClassName?: string;
  /** Classes applied to each item wrapper inside the track */
  itemClassName?: string;
  /** Classes applied to the inner vertical-safe wrapper of each slide when `itemClassName` is used */
  slideInnerClassName?: string;
  /** Scroll direction (`"left"` = standard right-to-left movement, `"right"` = reverse) */
  direction?: "left" | "right";
  /** Scrub smoothness (`true` or a number in seconds) */
  scrub?: boolean | number;
  /** ScrollTrigger start position (default: `"top top"`) */
  start?: string;
  /** Multiplier to control how fast/slow the horizontal scroll feels (default: `1`) */
  speedMultiplier?: number;
  /** Optional theme colors applied as `data-bgcolor` and `data-textcolor` attributes */
  bgColor?: string;
  textColor?: string;
}

/**
 * Generic, reusable Horizontal Scroll Section component.
 *
 * Usage with JSX children:
 * ```tsx
 * <HorizontalScrollSection>
 *   <h2>Intro</h2>
 *   <Card>Slide 1</Card>
 *   <Card>Slide 2</Card>
 * </HorizontalScrollSection>
 * ```
 *
 * Usage with a typed data array (`items` + `renderItem`):
 * ```tsx
 * <HorizontalScrollSection
 *   items={slides}
 *   renderItem={(slide) => <SlideCard slide={slide} />}
 * />
 * ```
 */
export function HorizontalScrollSection<T = unknown>({
  items,
  renderItem,
  keyExtractor,
  children,
  className = "left-0 flex h-screen overflow-hidden bg-ink text-paper",
  trackClassName = "flex h-screen items-center justify-start px-[10vw] py-[50px] [&>*]:min-w-[60vw] [&>*]:px-[5vw]",
  itemClassName,
  slideInnerClassName,
  direction = "left",
  scrub = true,
  start = "top top",
  speedMultiplier = 1,
  bgColor,
  textColor,
  ...rest
}: HorizontalScrollSectionProps<T>) {
  const { scrollerRef, isReady } = useSmoothScrollContext();
  const pinSectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);

  const innerClass = slideInnerClassName
    ? `min-h-full w-full shrink-0 flex flex-col justify-center [&>*]:shrink-0 ${slideInnerClassName}`
    : "min-h-full w-full shrink-0 flex flex-col justify-center [&>*]:shrink-0";

  useHorizontalScroll({
    containerRef: scrollerRef,
    pinSectionRef,
    pinWrapRef,
    direction,
    scrub,
    start,
    speedMultiplier,
    enabled: isReady,
  });

  return (
    <section
      ref={pinSectionRef}
      data-horizontal-scroll-section
      data-bgcolor={bgColor}
      data-textcolor={textColor}
      className={className}
      {...rest}
    >
      <div ref={pinWrapRef} className={trackClassName}>
        {items && renderItem
          ? items.map((item, index) => {
              const key = keyExtractor ? keyExtractor(item, index) : index;
              const node = renderItem(item, index);
              return itemClassName ? (
                <div key={key} className={itemClassName}>
                  <div data-horizontal-slide-inner className={innerClass}>
                    {node}
                  </div>
                </div>
              ) : (
                <div key={key} className="contents">
                  {node}
                </div>
              );
            })
          : null}

        {itemClassName && children
          ? Children.map(children, (child, index) => (
              <div key={index} className={itemClassName}>
                <div data-horizontal-slide-inner className={innerClass}>
                  {child}
                </div>
              </div>
            ))
          : children}
      </div>
    </section>
  );
}
