export interface SectionColors {
  bgColor: string;
  textColor: string;
}

export type HorizontalSlideItem =
  | {
      id: string;
      type: "text";
      heading: string;
    }
  | {
      id: string;
      type: "image";
      src: string;
      alt?: string;
    };

export interface PageContentConfig {
  hero: {
    colors: SectionColors;
    titleWords: string[];
    subtitle: string;
  };
  horizontalSections: {
    id: string;
    direction?: "left" | "right";
    items: HorizontalSlideItem[];
  }[];
  footer: {
    colors: SectionColors;
    image: string;
    credit: {
      label: string;
      href: string;
    };
  };
}

export const defaultPageContent: PageContentConfig = {
  hero: {
    colors: { bgColor: "#bcb8ad", textColor: "#032f35" },
    titleWords: ["Horizontal", "scroll", "section"],
    subtitle: "with GSAP ScrollTrigger & Locomotive Scroll",
  },
  horizontalSections: [
    {
      id: "sectionPin",
      direction: "left",
      items: [
        {
          id: "intro-heading",
          type: "text",
          heading:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          id: "img-1",
          type: "image",
          src: "https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900",
          alt: "Gallery image 1",
        },
        {
          id: "img-2",
          type: "image",
          src: "https://images.pexels.com/photos/3371358/pexels-photo-3371358.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900",
          alt: "Gallery image 2",
        },
        {
          id: "img-3",
          type: "image",
          src: "https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900",
          alt: "Gallery image 3",
        },
      ],
    },
  ],
  footer: {
    colors: { bgColor: "#e3857a", textColor: "#f1dba7" },
    image:
      "https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    credit: { label: "Made by Beings", href: "https://madebybeings.com" },
  },
};
