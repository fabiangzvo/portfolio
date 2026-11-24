"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Options = {
  stickyOffset: number;
  minPinnedHeight: number;
  /** Anything that changes the rendered items (length, language…) */
  itemsKey: unknown;
};

type Point = [progress: number, value: number];

function evalCurve(points: Point[], p: number): number {
  if (p <= points[0][0]) return points[0][1];
  for (let i = 1; i < points.length; i++) {
    const [p0, v0] = points[i - 1];
    const [p1, v1] = points[i];
    if (p <= p1) {
      return p1 === p0 ? v1 : v0 + ((v1 - v0) * (p - p0)) / (p1 - p0);
    }
  }
  return points[points.length - 1][1];
}

function addCurveToTimeline(
  tl: gsap.core.Timeline,
  el: Element | null,
  totalDuration: number,
  points: Point[],
  toVars: (value: number) => gsap.TweenVars,
) {
  if (!el || totalDuration <= 0) return;
  const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
  const stops = Array.from(
    new Set([0, 1, ...points.map(([p]) => clamp01(p))]),
  ).sort((a, b) => a - b);

  gsap.set(el, toVars(evalCurve(points, stops[0])));
  for (let i = 1; i < stops.length; i++) {
    const p0 = stops[i - 1];
    const p1 = stops[i];
    const dur = (p1 - p0) * totalDuration;
    if (dur <= 0) continue;
    tl.to(
      el,
      {
        ...toVars(evalCurve(points, p1)),
        duration: dur,
        ease: "none",
      },
      p0 * totalDuration,
    );
  }
}

export interface HorizontalTimelineElements {
  viewport: HTMLElement;
  track: HTMLElement;
  list: HTMLElement;
}

/**
 * Builds a GSAP timeline (duration = horizontal pixel shift) that:
 * 1. Translates `track` horizontally across `viewport`
 * 2. Fills `[data-hx-fill]` from 0% to 100%
 * 3. Lights up each `[data-hx-card]` dot, icon, index badge, and active border glow
 *    at the exact moment the progress line reaches that card's dot.
 */
export function buildGsapHorizontalTimeline({
  viewport,
  track,
  list,
}: HorizontalTimelineElements): {
  timeline: gsap.core.Timeline;
  shift: number;
} {
  viewport.scrollLeft = 0;
  gsap.set(track, { x: 0 });

  const viewportWidth = viewport.clientWidth || window.innerWidth;
  const shift = Math.max(0, track.scrollWidth - viewportWidth);
  const tl = gsap.timeline({ defaults: { ease: "none" } });

  const fillEl = list.querySelector<HTMLElement>("[data-hx-fill]");
  const cards = Array.from(
    list.querySelectorAll<HTMLElement>("[data-hx-card]"),
  );

  if (shift <= 0 || list.offsetWidth <= 0) {
    if (fillEl) gsap.set(fillEl, { scaleX: 1 });
    cards.forEach((card) => {
      const onEl = card.querySelector("[data-hx-on]");
      const iconEl = card.querySelector("[data-hx-icon]");
      const numEl = card.querySelector("[data-hx-num]");
      const glowEl = card.querySelector("[data-hx-glow]");
      if (onEl) gsap.set(onEl, { opacity: 1, scale: 1 });
      if (iconEl) gsap.set(iconEl, { opacity: 1 });
      if (numEl) gsap.set(numEl, { opacity: 1 });
      if (glowEl) gsap.set(glowEl, { opacity: 0 });
    });
    return { timeline: tl, shift: 0 };
  }

  tl.to(track, { x: -shift, duration: shift, ease: "none" }, 0);

  if (!cards.length) {
    if (fillEl) {
      gsap.set(fillEl, { scaleX: 0 });
      tl.to(fillEl, { scaleX: 1, duration: shift, ease: "none" }, 0);
    }
    return { timeline: tl, shift };
  }

  const dotX = (card: HTMLElement) => {
    const dot = card.querySelector<HTMLElement>("[data-hx-dot]");
    const dotCenter = dot
      ? dot.offsetLeft + dot.offsetWidth / 2
      : card.offsetWidth / 2;
    return list.offsetLeft + card.offsetLeft + dotCenter;
  };

  // Track x-coordinate of the reading cursor (viewport centre, or first dot if there is no intro)
  const cursorX = Math.min(viewportWidth / 2, dotX(cards[0]));
  const raw = (x: number) => (x - cursorX) / shift;
  const lastRaw = raw(dotX(cards[cards.length - 1]));
  const squeeze = lastRaw > 0.94 ? 0.94 / lastRaw : 1;
  const progressAt = (x: number) => raw(x) * squeeze;

  addCurveToTimeline(
    tl,
    fillEl,
    shift,
    [
      [progressAt(list.offsetLeft), 0],
      [Math.min(1, progressAt(list.offsetLeft + list.offsetWidth)), 1],
    ],
    (v) => ({ scaleX: v }),
  );

  const stride =
    cards.length > 1
      ? ((cards[1].offsetLeft - cards[0].offsetLeft) / shift) * squeeze
      : 1;
  const ramp = Math.min(stride * 0.35, 0.06);

  cards.forEach((card) => {
    const p = progressAt(dotX(card));
    const lightUp: Point[] = [
      [p - ramp, 0],
      [p, 1],
    ];

    addCurveToTimeline(
      tl,
      card.querySelector("[data-hx-on]"),
      shift,
      lightUp,
      (v) => ({ opacity: v, scale: 0.6 + 0.4 * v }),
    );
    addCurveToTimeline(
      tl,
      card.querySelector("[data-hx-icon]"),
      shift,
      lightUp,
      (v) => ({ opacity: 0.45 + 0.55 * v }),
    );
    addCurveToTimeline(
      tl,
      card.querySelector("[data-hx-num]"),
      shift,
      lightUp,
      (v) => ({ opacity: 0.3 + 0.7 * v }),
    );
    addCurveToTimeline(
      tl,
      card.querySelector("[data-hx-glow]"),
      shift,
      [
        [p - ramp, 0],
        [p, 1],
        [p + stride * 0.75, 0],
      ],
      (v) => ({ opacity: v }),
    );
  });

  return { timeline: tl, shift };
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * GSAP-powered hook for `<TimeLine />`:
 * - When placed inside `<HorizontalScrollSection>`, marks `data-mode="embedded"` so
 *   `<HorizontalScrollSection>` drives its horizontal track and progress animations
 *   as part of a single unified GSAP ScrollTrigger.
 * - When used standalone, creates its own GSAP `ScrollTrigger` pin.
 */
export function useHorizontalViewTimeline({
  stickyOffset,
  minPinnedHeight,
  itemsKey,
}: Options) {
  const pinRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const pin = pinRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    const list = listRef.current;
    if (!pin || !sticky || !track || !list) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isEmbedded = Boolean(
      pin.closest("[data-horizontal-scroll-section]"),
    );

    if (isEmbedded) {
      const syncEmbeddedMode = () => {
        if (reducedMotion.matches) {
          delete pin.dataset.mode;
          sticky.tabIndex = 0;
        } else {
          pin.dataset.mode = "embedded";
          sticky.scrollLeft = 0;
          sticky.removeAttribute("tabindex");
        }
        ScrollTrigger.refresh();
      };

      syncEmbeddedMode();
      reducedMotion.addEventListener("change", syncEmbeddedMode);
      return () => {
        reducedMotion.removeEventListener("change", syncEmbeddedMode);
        delete pin.dataset.mode;
      };
    }

    // Standalone mode (outside <HorizontalScrollSection>): drive with its own GSAP ScrollTrigger
    let ctx: gsap.Context | null = null;
    let rafId: number | null = null;

    const setupStandalone = () => {
      ctx?.revert();
      ctx = null;

      if (reducedMotion.matches || window.innerHeight < minPinnedHeight) {
        delete pin.dataset.mode;
        sticky.tabIndex = 0;
        return;
      }

      pin.dataset.mode = "pinned";
      sticky.removeAttribute("tabindex");

      ctx = gsap.context(() => {
        const { timeline, shift } = buildGsapHorizontalTimeline({
          viewport: sticky,
          track,
          list,
        });
        if (shift <= 0) return;

        ScrollTrigger.create({
          animation: timeline,
          trigger: pin,
          pin: true,
          pinSpacing: true,
          scrub: true,
          start: () => `top top+=${stickyOffset}`,
          end: () => `+=${shift}`,
          invalidateOnRefresh: true,
        });
      }, pin);

      ScrollTrigger.refresh();
    };

    const schedule = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(setupStandalone);
    };

    setupStandalone();
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(track);
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      ctx?.revert();
      delete pin.dataset.mode;
    };
  }, [stickyOffset, minPinnedHeight, itemsKey]);

  return { pinRef, stickyRef, trackRef, listRef };
}
