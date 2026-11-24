"use client";

/* eslint-disable @next/next/no-img-element -- remote images sized with `h-[80vh] w-auto`, like the original */
import type { ReactNode } from "react";
import { Link } from "@heroui/react";

import {
  defaultPageContent,
  type HorizontalSlideItem,
  type PageContentConfig,
} from "./types";
import { SmoothScrollContainer } from "@/hooks/useHorizontalScroll";
import { HorizontalScrollSection } from "./HorizontalScrollSection";
import { ParallaxElement, ScrollSection } from "./index";

const imageClass = "h-[80vh] w-auto object-cover";

export interface HorizontalScrollPageProps {
  /** Custom page data configuration (defaults to the original CodePen content) */
  content?: PageContentConfig;
  /** Optional custom renderer for items inside horizontal sections */
  renderSlideItem?: (item: HorizontalSlideItem, index: number) => ReactNode;
  /** Optional extra sections to render inside the smooth scroll container */
  children?: ReactNode;
}

function defaultRenderSlideItem(item: HorizontalSlideItem) {
  if (item.type === "text") {
    return <h2 className="max-w-[400px] text-[2rem]">{item.heading}</h2>;
  }
  return <img src={item.src} alt={item.alt ?? ""} className={imageClass} />;
}

/**
 * Page component built on top of the generic `<SmoothScrollContainer>`,
 * `<ScrollSection>`, `<ParallaxElement>`, and `<HorizontalScrollSection>` building blocks.
 */
export function HorizontalScrollPage({
  content = defaultPageContent,
  renderSlideItem = defaultRenderSlideItem,
  children,
}: HorizontalScrollPageProps) {
  const { hero, horizontalSections, footer } = content;

  return (
    <SmoothScrollContainer>
      {/* Hero section */}
      <ScrollSection
        bgColor={hero.colors.bgColor}
        textColor={hero.colors.textColor}>
        <div>
          <ParallaxElement
            as="h1"
            speed={1}
            className="absolute left-[10vw] top-[10vw] z-[4] mb-4 hyphens-auto break-words text-[16vw] font-extrabold leading-none md:text-[5rem]">
            {hero.titleWords.map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </ParallaxElement>
          <ParallaxElement
            as="p"
            speed={2}
            delay={0.2}
            className="absolute bottom-[10vw] right-[10vw] w-[200px] leading-normal">
            {hero.subtitle}
          </ParallaxElement>
        </div>
      </ScrollSection>

      {/* Generic horizontal scroll section(s) */}
      {horizontalSections.map((section) => (
        <HorizontalScrollSection
          key={section.id}
          id={section.id}
          direction={section.direction}
          items={section.items}
          keyExtractor={(item) => item.id}
          renderItem={renderSlideItem}
        />
      ))}

      {/* Optional custom sections passed as children */}
      {children}

      {/* Footer section */}
      <ScrollSection
        bgColor={footer.colors.bgColor}
        textColor={footer.colors.textColor}>
        <img src={footer.image} alt="" className={imageClass} />
        <ParallaxElement
          as="h2"
          speed={1}
          className="max-w-[400px] font-termina text-[2rem]">
          <Link
            href={footer.credit.href}
            isExternal
            className="text-[length:inherit] text-ink">
            {footer.credit.label}
          </Link>
        </ParallaxElement>
      </ScrollSection>
    </SmoothScrollContainer>
  );
}
