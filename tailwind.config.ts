import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        text: "var(--text)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        paragraph: "var(--paragraph)",
        buttonText: "var(--buttonText)",
        stroke: "var(--stroke)",
        highlight: "var(--highlight)",
        desktop: "var(--desktop)",
      },
      keyframes: {
        translateToRight: {
          from: {
            transform: "translateX(0px)",
          },
          to: {
            transform: "translateX(-20px)",
          },
        },
      },
      animation: {
        translateToRight: "translateToRight 2s ease-in-out infinite",
      },
      fontFamily: {
        albertSans: ["var(--albert-sans)"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
