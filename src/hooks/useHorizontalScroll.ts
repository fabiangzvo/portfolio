"use client";

import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type LocomotiveScroll from "locomotive-scroll";
import type { ILocomotiveScrollOptions } from "locomotive-scroll";
import { buildGsapHorizontalTimeline } from "./useHorizontalViewTimeline";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type LocomotiveScrollOptions = ILocomotiveScrollOptions;

export interface SmoothScrollContextValue {
  /** Ref to the `[data-scroll-container]` root element */
  containerRef: RefObject<HTMLDivElement | null>;
  /** Custom scroll wrapper element if `lenisOptions.wrapper` is an HTMLElement, otherwise `undefined` (window scroll) */
  scrollerRef?: RefObject<HTMLElement | null>;
  /** Active LocomotiveScroll v5 instance (null until mounted on client) */
  scroller: LocomotiveScroll | null;
  /** Whether LocomotiveScroll and ScrollTrigger have finished initializing */
  isReady: boolean;
  /** Manually trigger a ScrollTrigger + LocomotiveScroll layout refresh */
  refresh: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(
  null,
);

export function useSmoothScrollContext(): SmoothScrollContextValue {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) {
    throw new Error(
      "useSmoothScrollContext must be used inside a <SmoothScrollContainer>.",
    );
  }
  return ctx;
}

export interface SmoothScrollContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Custom options forwarded to `new LocomotiveScroll(options)` (Locomotive Scroll v5 / Lenis) */
  options?: LocomotiveScrollOptions;
}

/**
 * Generic smooth-scroll container that initializes Locomotive Scroll v5 (Lenis)
 * and syncs it with GSAP's ticker and ScrollTrigger.
 *
 * You can place any number of `<HorizontalScrollSection>` or `<ScrollSection>` components
 * (or custom GSAP triggers) inside it.
 */
export function SmoothScrollContainer({
  children,
  options,
  className = "",
  ...rest
}: SmoothScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const customScrollerRef = useRef<HTMLElement | null>(null);
  const [scroller, setScroller] = useState<LocomotiveScroll | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let instance: LocomotiveScroll | null = null;
    const onRefresh = () => {
      instance?.lenisInstance?.resize();
      instance?.resize();
    };

    const onAnchorClick = (event: MouseEvent) => {
      if (!instance) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        "a[href^='#']",
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const targetEl = document.getElementById(hash.slice(1));
      if (!targetEl) return;

      event.preventDefault();
      const slideEl = targetEl.closest<HTMLElement>(
        "[data-horizontal-scroll-target]",
      );
      if (slideEl?.dataset.horizontalScrollTarget !== undefined) {
        instance.scrollTo(Number(slideEl.dataset.horizontalScrollTarget));
      } else {
        instance.scrollTo(targetEl);
      }
    };

    const init = async () => {
      const { default: LocomotiveScrollCtor } =
        await import("locomotive-scroll");
      if (cancelled) return;

      gsap.ticker.lagSmoothing(0);

      const userScrollCallback = options?.scrollCallback;
      const customWrapper =
        options?.lenisOptions?.wrapper instanceof HTMLElement
          ? options.lenisOptions.wrapper
          : null;
      customScrollerRef.current = customWrapper;

      instance = new LocomotiveScrollCtor({
        ...options,
        scrollCallback: (scrollValues) => {
          ScrollTrigger.update();
          userScrollCallback?.(scrollValues);
        },
        initCustomTicker:
          options?.initCustomTicker ??
          ((render) => {
            gsap.ticker.add(render);
          }),
        destroyCustomTicker:
          options?.destroyCustomTicker ??
          ((render) => {
            gsap.ticker.remove(render);
          }),
      });

      if (customWrapper) {
        ScrollTrigger.defaults({ scroller: customWrapper });
      }
      ScrollTrigger.addEventListener("refresh", onRefresh);
      document.addEventListener("click", onAnchorClick);

      setScroller(instance);
      setIsReady(true);

      requestAnimationFrame(() => {
        if (!cancelled) {
          ScrollTrigger.refresh();
        }
      });
    };

    const start = () => void init();
    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
      document.removeEventListener("click", onAnchorClick);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      instance?.destroy();
      customScrollerRef.current = null;
      setScroller(null);
      setIsReady(false);
    };
  }, [options]);

  const value = useMemo<SmoothScrollContextValue>(
    () => ({
      containerRef,
      scrollerRef: customScrollerRef.current ? customScrollerRef : undefined,
      scroller,
      isReady,
      refresh: () => ScrollTrigger.refresh(),
    }),
    [scroller, isReady],
  );

  return createElement(
    SmoothScrollContext.Provider,
    { value },
    createElement(
      "div",
      {
        ref: containerRef,
        "data-scroll-container": true,
        className,
        ...rest,
      },
      children,
    ),
  );
}

export interface UseHorizontalScrollOptions {
  /** Ref to the scroll container (optional if used inside `<SmoothScrollContainer>`) */
  containerRef?: RefObject<HTMLElement | null>;
  /** Ref to the section that gets pinned */
  pinSectionRef: RefObject<HTMLElement | null>;
  /** Ref to the horizontal track inside the pinned section */
  pinWrapRef: RefObject<HTMLElement | null>;
  /** Scroll direction (`"left"` moves content right-to-left as you scroll down) */
  direction?: "left" | "right";
  /** Scrub smoothness (`true` or a number in seconds) */
  scrub?: boolean | number;
  /** ScrollTrigger start position (default: `"top top"`) */
  start?: string;
  /** Multiplier for horizontal scroll duration relative to track width (default: `1`) */
  speedMultiplier?: number;
  /** External flag indicating when the scroller is ready (handled automatically via context) */
  enabled?: boolean;
}

/**
 * Generic hook that pins any section and scrolls its track horizontally with GSAP ScrollTrigger.
 * Works both inside `<SmoothScrollContainer>` and standalone (native window scroll or custom scroller).
 */
export function useHorizontalScroll({
  containerRef,
  pinSectionRef,
  pinWrapRef,
  direction = "left",
  scrub = true,
  start = "top top",
  speedMultiplier = 1,
  enabled = true,
}: UseHorizontalScrollOptions) {
  useEffect(() => {
    if (!enabled) return;

    const pinSection = pinSectionRef.current;
    const pinWrap = pinWrapRef.current;
    if (!pinSection || !pinWrap) return;

    const scrollerEl = containerRef?.current ?? undefined;
    let ctx: gsap.Context | null = null;
    let lastSignature = "";
    let rafId: number | null = null;

    const getSignature = () => {
      const viewportH = pinSection.clientHeight || window.innerHeight;
      const slides = Array.from(pinWrap.children) as HTMLElement[];
      const slideMetrics = slides.map((slide) => {
        const inner =
          slide.querySelector<HTMLElement>("[data-horizontal-slide-inner]") ??
          slide;
        const slideH = slide.clientHeight || viewportH;
        const rawExtraY = Math.max(0, inner.scrollHeight - slideH);
        const extraY = rawExtraY > 2 ? rawExtraY : 0;

        const hxMetrics = Array.from(
          slide.querySelectorAll<HTMLElement>("[data-hx-timeline]"),
        )
          .map((hx) => {
            const vp = hx.querySelector<HTMLElement>("[data-hx-viewport]");
            const tr = hx.querySelector<HTMLElement>("[data-hx-track]");
            return `${vp?.clientWidth ?? 0}x${tr?.scrollWidth ?? 0}`;
          })
          .join("|");

        return `${extraY}[${hxMetrics}]`;
      });
      return `${pinSection.clientWidth}x${pinSection.clientHeight}:${pinWrap.scrollWidth}:${slideMetrics.join(",")}`;
    };

    const build = () => {
      const slides = Array.from(pinWrap.children) as HTMLElement[];
      const hasSlideInners = slides.some((slide) =>
        Boolean(slide.querySelector("[data-horizontal-slide-inner]")),
      );
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      ctx = gsap.context(() => {
        const getViewportW = () => pinSection.clientWidth || window.innerWidth;
        const getMaxScrollX = () =>
          Math.max(0, pinWrap.scrollWidth - getViewportW());

        if (!hasSlideInners) {
          const maxX = getMaxScrollX();
          gsap.set(pinWrap, {
            x: () => (direction === "right" ? - getMaxScrollX() : 0),
          });
          if (maxX <= 1) return;

          gsap.to(pinWrap, {
            scrollTrigger: {
              ...(scrollerEl ? { scroller: scrollerEl } : {}),
              scrub,
              trigger: pinSection,
              pin: true,
              pinSpacing: true,
              start,
              end: () => `+=${getMaxScrollX() * speedMultiplier}`,
              invalidateOnRefresh: true,
            },
            x: () => (direction === "left" ? -getMaxScrollX() : 0),
            ease: "none",
          });
          return;
        }

        // Slide-by-slide timeline: drives embedded <TimeLine />, vertical overflow, and horizontal slides
        const maxScrollX = getMaxScrollX();
        const viewportH = pinSection.clientHeight || window.innerHeight;
        const initialX = direction === "right" ? -maxScrollX : 0;
        gsap.set(pinWrap, { x: initialX });

        const slideStartTimes: number[] = [];
        let currentX = initialX;

        const tl = gsap.timeline({ defaults: { ease: "none" } });

        slides.forEach((slide, index) => {
          const inner =
            slide.querySelector<HTMLElement>("[data-horizontal-slide-inner]") ??
            slide;
          gsap.set(inner, { y: 0 });

          // Ensure embedded <TimeLine /> layout classes apply before measuring dimensions
          const hxTimelines = Array.from(
            slide.querySelectorAll<HTMLElement>("[data-hx-timeline]"),
          );
          hxTimelines.forEach((hx) => {
            const pinEl = hx.querySelector<HTMLElement>("[data-hx-pin]");
            if (pinEl && !reducedMotion) {
              pinEl.dataset.mode = "embedded";
            }
          });

          if (index > 0) {
            const rawOffset = Math.min(slide.offsetLeft, maxScrollX);
            const nextX =
              direction === "left" ? -rawOffset : -maxScrollX + rawOffset;
            const deltaX = Math.abs(nextX - currentX);
            if (deltaX > 0) {
              tl.to(pinWrap, { x: nextX, duration: deltaX });
              currentX = nextX;
            }
          }

          slideStartTimes[index] = tl.duration();

          if (!reducedMotion) {
            hxTimelines.forEach((hx) => {
              const viewport =
                hx.querySelector<HTMLElement>("[data-hx-viewport]");
              const track = hx.querySelector<HTMLElement>("[data-hx-track]");
              const list = hx.querySelector<HTMLElement>("[data-hx-list]");
              if (!viewport || !track || !list) return;

              const { timeline: hxTl, shift } = buildGsapHorizontalTimeline({
                viewport,
                track,
                list,
              });
              if (shift > 0) {
                tl.add(hxTl);
              }
            });
          }

          const slideH = slide.clientHeight || viewportH;
          const extraY = Math.max(0, inner.scrollHeight - slideH);
          if (extraY > 2) {
            tl.to(inner, { y: -extraY, duration: extraY });
          }
        });

        if (tl.duration() <= 1) {
          slides.forEach((slide) => {
            delete slide.dataset.horizontalScrollTarget;
          });
          return;
        }

        ScrollTrigger.create({
          ...(scrollerEl ? { scroller: scrollerEl } : {}),
          animation: tl,
          scrub,
          trigger: pinSection,
          pin: true,
          pinSpacing: true,
          start,
          end: () => `+=${tl.duration() * speedMultiplier}`,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            const totalDur = tl.duration();
            slides.forEach((slide, idx) => {
              const ratio =
                totalDur > 0 ? (slideStartTimes[idx] ?? 0) / totalDur : 0;
              const targetY = Math.round(
                self.start + ratio * (self.end - self.start),
              );
              slide.dataset.horizontalScrollTarget = String(targetY);
            });
          },
        });
      }, pinSection);

      lastSignature = getSignature();
    };

    build();
    ScrollTrigger.refresh();

    const rebuildIfNeeded = () => {
      rafId = null;
      const nextSig = getSignature();
      if (nextSig === lastSignature) return;

      const savedScroll = window.scrollY;
      ctx?.revert();
      build();
      ScrollTrigger.refresh();
      if (!scrollerEl && Math.abs(window.scrollY - savedScroll) > 1) {
        window.scrollTo(0, savedScroll);
        ScrollTrigger.update();
      }
    };

    // Refresh timeline whenever viewport or child content inside the slides resizes
    const resizeObserver = new ResizeObserver(() => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(rebuildIfNeeded);
    });
    resizeObserver.observe(pinSection);
    resizeObserver.observe(pinWrap);
    Array.from(pinWrap.children).forEach((slide) => {
      const inner = slide.querySelector("[data-horizontal-slide-inner]");
      resizeObserver.observe(inner ?? slide);
      slide.querySelectorAll("[data-hx-track]").forEach((track) => {
        resizeObserver.observe(track);
      });
    });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      Array.from(pinWrap.children).forEach((slide) => {
        delete (slide as HTMLElement).dataset.horizontalScrollTarget;
      });
      ctx?.revert();
    };
  }, [
    containerRef,
    pinSectionRef,
    pinWrapRef,
    direction,
    scrub,
    start,
    speedMultiplier,
    enabled,
  ]);
}
