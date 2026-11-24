"use client";

import type { HTMLAttributes, ReactNode } from "react";

export interface ScrollSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Optional `data-bgcolor` attribute for theme transitions */
  bgColor?: string;
  /** Optional `data-textcolor` attribute for theme transitions */
  textColor?: string;
}

const defaultSectionClass =
  "relative mx-auto grid min-h-screen w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center gap-8 px-[10vw] py-[50px]";

/**
 * Generic vertical section wrapper for use inside `<SmoothScrollContainer>`.
 */
export function ScrollSection({
  children,
  bgColor,
  textColor,
  className = defaultSectionClass,
  ...rest
}: ScrollSectionProps) {
  return (
    <section
      data-bgcolor={bgColor}
      data-textcolor={textColor}
      className={className}
      {...rest}
    >
      {children}
    </section>
  );
}

export interface ParallaxElementProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** HTML tag to render (default: `"div"`) */
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
  /** Locomotive Scroll `data-scroll-speed` value */
  speed?: number | string;
  /** Locomotive Scroll `data-scroll-delay` value */
  delay?: number | string;
  /** Locomotive Scroll `data-scroll-direction` value */
  direction?: "vertical" | "horizontal";
}

/**
 * Generic Locomotive Scroll parallax element (`data-scroll`, `data-scroll-speed`, `data-scroll-delay`).
 */
export function ParallaxElement({
  children,
  as: Tag = "div",
  speed,
  delay,
  direction,
  ...rest
}: ParallaxElementProps) {
  return (
    <Tag
      data-scroll
      data-scroll-speed={speed !== undefined ? String(speed) : undefined}
      data-scroll-delay={delay !== undefined ? String(delay) : undefined}
      data-scroll-direction={direction}
      {...rest}
    >
      {children}
    </Tag>
  );
}
